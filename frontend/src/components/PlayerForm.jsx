const PlayerForm = ({
  player,
  setPlayer,
  handleSubmit,
  buttonText = "Add Player",
  handleDelete,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 text-white items-center p-4"
    >
      <input
        type="text"
        placeholder="Name"
        value={player.name}
        onChange={(e) => setPlayer({ ...player, name: e.target.value })}
        required
        className="border-0 shadow-sm shadow-emerald-300 rounded-lg pl-3"
      />
      <input
        type="text"
        placeholder="Position"
        value={player.position}
        onChange={(e) => setPlayer({ ...player, position: e.target.value })}
        required
        className="border-0 shadow-sm shadow-emerald-300 rounded-lg pl-3"
      />
      <input
        type="number"
        placeholder="Number"
        value={player.number}
        onChange={(e) =>
          setPlayer({ ...player, number: parseInt(e.target.value) })
        }
        required
        className="border-0 shadow-sm shadow-emerald-300 rounded-lg pl-3"
      />
      <input
        type="number"
        placeholder="Age (optional)"
        value={player.age || ""}
        onChange={(e) =>
          setPlayer({ ...player, age: parseInt(e.target.value) })
        }
        className="border-0 shadow-sm shadow-emerald-300 rounded-lg pl-3"
      />
      <input
        type="text"
        placeholder="Nationality (optional)"
        value={player.nationality || ""}
        onChange={(e) => setPlayer({ ...player, nationality: e.target.value })}
        className="border-0 shadow-sm shadow-emerald-300 rounded-lg pl-3"
      />
      <div className="flex justify-between gap-15">
        <button
          type="submit"
          className="border-emerald-500 bg-emerald-500 rounded-full gap-t-5 hover:bg-emerald-600 font-semibold hover:scale-105 px-1.5"
        >
          {buttonText}
        </button>
        {handleDelete && (
          <button
            type="button"
            className="border-red-500 bg-red-500 rounded-full gap-t-5 hover:bg-red-600 font-semibold hover:scale-105 px-1.5"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
};

export default PlayerForm;
