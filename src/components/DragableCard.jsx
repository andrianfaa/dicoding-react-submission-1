export default function DragableCard({
  data,
  buttonText,
  onClickDelete,
  onClickMove,
}) {
  const {
    // eslint-disable-next-line no-unused-vars
    title, id, body, archived, createdAt,
  } = data;

  const handleDragStart = (event) => {
    const { dataTransfer } = event;

    dataTransfer.setData("text/plain", id);
    dataTransfer.dropEffect = "move";
    event.currentTarget.classList.add("dragging");
  };

  const handleDragEnd = (event) => {
    event.currentTarget.classList.remove("dragging");
  };

  return (
    <div
      className="dragable-card"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      draggable
    >
      <div className="dragable-card--body">
        <h3>{title}</h3>
        <small className="dragable-card--body__date">
          {new Date(createdAt).toLocaleDateString()}
        </small>
        <p className="dragable-card--body__text">{body}</p>
      </div>

      <div className="dragable-card--buttons">
        <button type="button" className="delete" onClick={() => onClickDelete(id)}>
          delete
        </button>
        <button type="button" onClick={() => onClickMove(id)}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}
