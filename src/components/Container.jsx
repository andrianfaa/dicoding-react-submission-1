import DragableCard from "./DragableCard";
import DropableContainer from "./DropableContainer";

export default function Container({
  notes,
  title,
  moveButtonText,
  onDrop,
  onClickDelete,
  onClickMove,
}) {
  return (
    <DropableContainer onDrop={onDrop} data={notes} className="container">
      <h2>{title}</h2>

      {notes.length > 0 ? (
        <div className="row">
          {notes.map((note) => (
            <DragableCard
              data={note}
              key={note.id}
              buttonText={moveButtonText}
              onClickDelete={onClickDelete}
              onClickMove={onClickMove}
            />
          ))}
        </div>
      ) : (
        <p className="not-found">No active notes found</p>
      )}
    </DropableContainer>
  );
}
