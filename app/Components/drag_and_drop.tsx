"use client";
import React, { useState } from "react";
import { FaFireAlt, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Drag_and_drop() {
  const [cards, setCards] = useState(DEFAULT_CARDS);
  return (
    <div className="h-[100vh] w-full">
      <div className="flex gap-3 p-12 h-full justify-center">
        <Column
          title="Backlog"
          column="backlog"
          headingColor="text-neutral-500"
          cards={cards}
          setCards={setCards}
        />
        <Column
          title="TODO"
          column="todo"
          headingColor="text-yellow-200"
          cards={cards}
          setCards={setCards}
        />
        <Column
          title="In progress"
          column="doing"
          headingColor="text-blue-200"
          cards={cards}
          setCards={setCards}
        />
        <Column
          title="Complete"
          column="done"
          headingColor="text-emerald-200"
          cards={cards}
          setCards={setCards}
        />
        <BurnTrash setCard={setCards} />
      </div>
    </div>
  );
}

const Column = ({ title, column, cards, headingColor, setCards }: any) => {
  const [active, setActive] = useState(false);
  const CardType = cards.filter((c: any) => c.column == column);
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: any) => {
    console.log(id);
    e.dataTransfer.setData("cardId", id.toString());
  };
  const handleDragOver = (e: any) => {
    e.preventDefault();
    setActive(true);
  };
  const handleDragLeave = (e: any) => {
    setActive(false);
  };
  const handleDrop = (e: DragEvent | any) => {
    const id = e.dataTransfer?.getData("cardId");
    setCards?.((priv: any) => [
      ...priv,
      (cards.find((c: any) => c.id == id).column = column),
    ]);
    setActive(false);
  };
  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`shrink-0 space-y-3 w-56 shrink-0${
        active && "bg-gray-800/50"
      }  h-full`}
    >
      <div>
        <h2 className={`${headingColor}`}>
          <span className="text-gray-400/50">{CardType?.length}</span> {title}
        </h2>
      </div>
      <div className="flex flex-col">
        {CardType.map((c: any) => {
          return (
            <Card
              key={c.id}
              title={c.title}
              id={c.id}
              handleDragStart={handleDragStart}
            />
          );
        })}
      </div>
      <AddButton setCards={setCards} column={column} />
    </div>
  );
};

const BurnTrash = ({
  setCard,
}: {
  setCard: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [active, setActive] = useState(false);
  const handleDragOver = (e: any) => {
    e.preventDefault();
    setActive(true);
  };
  const handleDragLeave = () => {
    setActive(false);
  };
  const handleDrop = (e: DragEvent | any) => {
    setActive(false);
    const id = e.dataTransfer?.getData("cardId");
    setCard((prv: any) => prv.filter((c: any) => c.id != id));
  };
  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`${
        active ? "bg-red-400/80" : "bg-slate-700/50"
      } grid place-content-center h-56 flex-shrink-0 w-56 rounded border border-gray-500 mt-10`}
    >
      <span className="text-2xl pointer-events-none">
        {active ? <FaFireAlt className="animate-ping" /> : <FaTrash />}
      </span>
    </div>
  );
};

const Card = ({ title, id, column, handleDragStart }: any) => {
  return (
    <>
      <CardIndecator />
      <motion.div
        layout
        layoutId={id}
        onDragStart={(e) => handleDragStart(e, id)}
        draggable="true"
        className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p>{title}</p>
      </motion.div>{" "}
      <CardIndecator />
    </>
  );
};
const CardIndecator = () => {
  return <div className="h-[2px] w-full rounded-full bg-violet-500 opacity-0"></div>;
};

const DEFAULT_CARDS = [
  // BACKLOG
  { title: "Look into render bug in dashboard", id: "1", column: "backlog" },
  { title: "SOX compliance checklist", id: "2", column: "backlog" },
  { title: "[SPIKE] Migrate to Azure", id: "3", column: "backlog" },
  { title: "Document Notifications service", id: "4", column: "backlog" },
  // TODO
  {
    title: "Research DB options for new microservice",
    id: "5",
    column: "todo",
  },
  { title: "Postmortem for outage", id: "6", column: "todo" },
  { title: "Sync with product on Q3 roadmap", id: "7", column: "todo" },

  // DOING
  {
    title: "Refactor context providers to use Zustand",
    id: "8",
    column: "doing",
  },
  { title: "Add logging to daily CRON", id: "9", column: "doing" },
  // DONE
  {
    title: "Set up DD dashboards for Lambda listener",
    id: "10",
    column: "done",
  },
];

const AddButton = ({ setCards, column }: { setCards: any; column: string }) => {
  // Add a new card to the backlog
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const handleAdd = () => {
    setOpen(false);
    setCards((prev: []) => [
      ...prev,
      { title: text, id: (prev.length + 1).toString(), column },
    ]);
  };
  return (
    <motion.div layout className="cursor-pointer">
      {open && (
        <div className="flex flex-col justify-start gap-2">
          <textarea
            onChange={(e) => {
              setText(e.target.value);
            }}
            className="border-violet-400 bg-violet-400/20"
            name=""
            id=""
          ></textarea>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setOpen(false);
              }}
              className="text-sm opacity-50"
            >
              close
            </button>
            <button
              onClick={handleAdd}
              className="text-sm  text-black bg-white px-2 rounded-full"
            >
              Add
            </button>
          </div>
        </div>
      )}
      {!open && (
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="text-sm opacity-50"
        >
          Add card +
        </button>
      )}
    </motion.div>
  );
};
