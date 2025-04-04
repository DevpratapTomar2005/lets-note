import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { useMutation } from "@tanstack/react-query";
import {
  updateNote,
  refreshUserToken,
  uploadContentImg,
} from "../services/apiCalls";
import { updateStoreNote } from "../slices/userSlice";
import { isLoggedIn } from "../slices/loginSlice";
import { toast } from "react-toastify";

const NoteEditPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notes = useSelector((state) => state.user.notes);
  const { noteId } = useParams();

  const note = notes.filter((n) => n._id == noteId)[0];
 
  const editorRef = useRef(note.content);
 
  const { mutate: editNote, isPending: saving } = useMutation({
    mutationFn: async ({ id, content }) => {
      return await updateNote({ id, content });
    },
    onSuccess: (response) => {
      dispatch(
        updateStoreNote({
          id: response.data.id,
          content: response.data.content,
        })
      );
    },
    onError: async (error, id, content) => {
      if (error.status === 401) {
        try {
          await refreshUserToken();
          editNote({ id, content });
        } catch (error) {
          dispatch(isLoggedIn(false));
          navigate("/login");
          toast.error("User Logged Out!");
        }
      } else {
        toast.error(`${error.response.data.message}`);
      }
    },
  });

  const { mutate: uploadTinyMCEImage } = useMutation({
    mutationFn: async (formData) => {
      const response = await uploadContentImg(formData);
      return response;
    },
  });

  const handleEditorChange = (content) => {
    editNote({ id: note._id, content });
  };
  const handleImageUpload = (blobInfo, progress) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("tinyMCEImg", blobInfo.blob(), blobInfo.filename());

      uploadTinyMCEImage(formData, {
        onSuccess: (response) => {
          resolve(response.data.url);
        },
        onError: async (error) => {
          console.error("Upload failed:", error);
          if (error.status === 401) {
            try {
              await refreshUserToken();
              handleImageUpload(blobInfo, progress);
            } catch (error) {
              dispatch(isLoggedIn(false));
              navigate("/login");
              toast.error("User Logged Out!");
            }
          }
          reject({ message: "Image upload failed", remove: true });
        },
      });
    });
  };


  const handleWordDownload = (noteTitle) => {
    if (editorRef.current || editorRef.current === "") {
      
      const content = editorRef.current
      
      
      const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
                    "xmlns:w='urn:schemas-microsoft-com:office:word' " +
                    "xmlns='http://www.w3.org/TR/REC-html40'>" +
                    "<head><meta charset='utf-8'><title>Export HTML to Word</title></head><body>";
      const footer = "</body></html>";
      const sourceHTML = header + content + footer;
      
      const blob = new Blob([sourceHTML], {type: 'application/msword'});
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `${noteTitle}.doc`; 
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };
  
  
  return (
    <div className="relative top-[2.74rem]">
      <div className="flex justify-between items-center bg-white py-1 px-3 border-b-1 h-13 border-gray-300">
        <div className="text-gray-600 text-lg">Title: {note.title}</div>
        <div>
         <button className="bg-blue-500 text-white p-2 text-sm rounded hover:bg-blue-600" onClick={()=>handleWordDownload(note.title)}>Download</button>
          <span
            className=" text-[14px] py-2 px-4 rounded outline-2 cursor-pointer outline-purple-500 text-purple-500 mx-2 hover:bg-purple-500 hover:text-white"
            onClick={() => handleEditorChange(editorRef.current)}
          >
            {saving ? "Saving..." : "Save"}
          </span>
        </div>
      </div>

      <div>
        <Editor
          apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
          initialValue={note.content}
          // onInit={(evt, editor) => editorRef.current = editor}
          init={{
            height: "83vh",
            branding: false,
            skin: "borderless",
            menubar: true,
            help_accessibility: false,

            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            images_upload_handler: handleImageUpload,
            automatic_uploads: true,

            
            file_picker_types: "image",
            file_picker_callback: function (cb, value, meta) {
              const input = document.createElement("input");
              input.setAttribute("type", "file");
              input.setAttribute("accept", "image/*");

              input.onchange = function () {
                const file = this.files[0];

                
                const validTypes = [
                  "image/jpeg",
                  "image/png",
                  "image/gif",
                  "image/webp",
                ];
                if (!validTypes.includes(file.type)) {
                  alert(
                    "Please select a valid image file (JPEG, PNG, GIF, WEBP)"
                  );
                  return;
                }

                if (file.size > 5 * 1024 * 1024) {
                  alert("File size should be less than 5MB");
                  return;
                }

                const reader = new FileReader();
                reader.onload = function (e) {
               
                  cb(e.target.result, { alt: file.name });
                };
                reader.readAsDataURL(file);
              };

              input.click();
            },
          }}
          onEditorChange={(e) => {
            
            editorRef.current = e;
          }}
        />

        
      </div>
    </div>
  );
};

export default NoteEditPage;
