const SportForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="p-3">
      <form onSubmit={handleSubmit} className="space-y-3 flex flex-col gap-1.5">
        <input
          type="text"
          className="py-3 px-4 border rounded-lg w-full bg-gray-600"
          placeholder="Write sport name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="flex justify-between">
          <button className="bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 foucs:ring-emerald-500 focus:ring-opacity-50 cursor-pointer">
            {buttonText}
          </button>

          {handleDelete && (
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 foucs:ring-red-500 focus:ring-opacity-50 cursor-pointer"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SportForm;
