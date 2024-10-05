import { useState } from "react";
import JoditEditor from "jodit-react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";
import CmsTitle from "./CmsTitle";
import Swal from "sweetalert2";
import showAlert from "../../../../Common/alert"

const AdminHero = () => {
  const [content, setContent] = useState("");
  const [on, setOn] = useState(false);

  const upload_hero_section = (e) => {
    e.preventDefault();
    const data = e.target.hero.value;
    const name = "hero_section";
    const upload = {
      data,
      name,
    };
    console.log(upload);
    fetch("https://doob.dev/api/v1/admin/upload-content", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(upload),
    })
      .then((res) => res.json())
      .then((data) => {
        showAlert("success", "", "success");
      });
  };

  return (
    <>
      <section
        style={{
          transition: "all 0.3s ease-in-out",
        }}
        className={`border overflow-hidden rounded ${on ? "max-h-[1000px]" : "max-h-[60px]"
          } cursor-pointer `}
      >
        <header
          onClick={() => setOn(!on)}
          className="bg-gray-100 md:p-4 p-2 flex items-center justify-between"
        >
          <CmsTitle text=" Hero Section" />
          <span className="text-gray-500">
            {!on ? <FaAngleDown /> : <FaAngleUp />}
          </span>
        </header>
        <form onSubmit={upload_hero_section} className="bg-gray-50 p-3">
          <div>
            <div className="form-group flex flex-col gap-2">
              <JoditEditor
                id="hero"
                name="hero"
                // Set the value prop
                // Use the function to handle change
                tabIndex={1}
                config={{
                   readonly: false,height: 200,resizable: true,
                  uploader: {
                    insertImageAsBase64URI: true,
                  },
                }}
              />
            </div>
          </div>
          <br />

          <button className="bg-gray-900 text-white px-4 w-full py-2">
            Submit
          </button>
        </form>
      </section>
    </>
  );
};

export default AdminHero;
