export default function DropableContainer({
  children,
  onDrop,
  data,
  className,
}) {
  const hanldeDragOver = (event) => {
    event.preventDefault();
    event.currentTarget.classList.add("drag-over");
  };

  const handleDragLeave = (event) => {
    event.currentTarget.classList.remove("drag-over");
  };

  const handleOnDrop = (event) => {
    event.preventDefault();

    const id = event.dataTransfer.getData("text/plain");
    const findData = data.find((item) => item.id === id);

    if (findData) return;

    onDrop(id);
    event.currentTarget.classList.remove("drag-over");
  };

  return (
    <div
      className={`dropable-container ${className}`}
      onDrop={handleOnDrop}
      onDragOver={hanldeDragOver}
      onDragEnd={handleDragLeave}
      onDragLeave={handleDragLeave}
    >
      {children}
    </div>
  );
}
