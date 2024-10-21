import Aurora_Effect from "./Components/Aurora_Effect";
import Drag_and_drop from "./Components/drag_and_drop";
import Draggable_Carousel from "./Components/Draggable_Carousel";
import Hover_card from "./Components/hover_card";
import Staggered_Text from "./Components/Staggered_Text";

export default function Home() {
  return (
    <main>
      {/* <Drag_and_drop /> */}
      {/* <Staggered_Text/> */}
      <Aurora_Effect />
      {/* <Draggable_Carousel /> */}
      <div className="flex flex-col hidden justify-center items-center gap-8 h-[100vh] w-full">
        <h1 className="font-bold text-3xl">Farmer Motion</h1>
        <div className="flex gap-4">
          <Hover_card />
          <Hover_card />
          <Hover_card />
        </div>
      </div>
    </main>
  );
}
