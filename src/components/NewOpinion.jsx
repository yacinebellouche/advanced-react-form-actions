import { useActionState, use } from "react";
import Submit from "./Submit";
import { OpinionsContext } from "../store/opinions-context";
// use === useContext
function isNotValid(data) {
  return data === null || data === "";
}

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext);

  async function shareOpinionAction(prevState, formData) {
    const userName = formData.get("userName");
    const title = formData.get("title");
    const opinion = formData.get("body");
    let errors = [];

    if (isNotValid(userName)) {
      errors.push("Please make sure to fill the UserName");
    }
    if (isNotValid(title) || title.trim().length < 5) {
      errors.push(
        "Please make sure to fill a valid Title ( at lease 5 characters long)"
      );
    }
    if (isNotValid(opinion) || opinion.trim().length < 10) {
      errors.push(
        "Please make sure to share your opinion( must be bteween 10 and 300 characters long.)"
      );
    }

    if (errors.length > 0) {
      return {
        errors,
        enteredValues: {
          userName,
          title,
          opinion,
        },
      };
    }

    await addOpinion({
      title,
      body: opinion,
      userName,
    });

    return { errors: null };
  }

  const [formData, handleAction] = useActionState(shareOpinionAction, {
    errors: null,
  });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={handleAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formData.enteredValues?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formData.enteredValues?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formData.enteredValues?.opinion}
          ></textarea>
        </p>
        {formData.errors && (
          <ul className="errors">
            {formData.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <Submit />
      </form>
    </div>
  );
}
