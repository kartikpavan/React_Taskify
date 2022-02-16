import React, { useEffect } from "react";

function Alert({ type, message, showAlert, list }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      showAlert(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [list]);

  const alertType = (type) => {
    if (type === "danger") {
      return `className="p-4 mb-4 w-8/12 mx-auto font-bold text-center text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"`;
    } else {
      return `class="p-4 mb-4 w-9/12 mx-auto font-bold text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"`;
    }
  };
  return (
    <article>
      <div className={`${alertType(type)}`}>{message}</div>
    </article>
  );
}

export default Alert;
