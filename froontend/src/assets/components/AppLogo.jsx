import { BookOpen } from "lucide-react";

function AppLogo({ text = "NoteKeeper", size = 28 }) {
  return (
    <div className="app-logo">
      <BookOpen size={size} />
      <span>{text}</span>
    </div>
  );
}

export default AppLogo;
