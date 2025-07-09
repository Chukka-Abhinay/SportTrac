const SportForm = ({
  value,
  setValue,
  video,
  setVideo,
  handleSubmit,
  uploadFileHandler,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="p-3">
      <form onSubmit={handleSubmit} className="space-y-3 flex flex-col gap-1.5">
        {video && (
          <div className="text-center mb-6 items-center pl-[40%] pt-10">
            <video
              src={video}
              alt="sport video"
              className="block mx-auto w-[200px] h-[200px] object-contain rounded"
            />
          </div>
        )}

        <label className="text-white py-2 px-4 block w-full text-center rounded-lg cursor-pointer font-bold">
          {video ? `Uploaded Video: ${video.split("/").pop()}` : ""}
          <br />
          <div>
            <span className="border bg-gray-700 rounded px-2 mt-2 inline-block">
              Upload Video
            </span>
          </div>
          <input
            type="file"
            accept="video/*"
            onChange={uploadFileHandler}
            className="hidden"
          />
        </label>
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
