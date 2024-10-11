import { Dispatch, FC, SetStateAction } from "react";
import { Editor } from "@tiptap/react";
import { ALargeSmall, Ban } from "lucide-react";
// constants
import { COLORS_LIST } from "@/constants/common";
// helpers
import { cn } from "@/helpers/common";
import { BackgroundColorItem, TextColorItem } from "../menu-items";

type Props = {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const BubbleMenuColorSelector: FC<Props> = (props) => {
  const { editor, isOpen, setIsOpen } = props;

  const activeTextColor = COLORS_LIST.find((c) => editor.getAttributes("textStyle").color === c.textColor);
  const activeBackgroundColor = COLORS_LIST.find((c) =>
    editor.isActive("highlight", {
      color: c.backgroundColor,
    })
  );

  return (
    <div className="relative h-full">
      <button
        type="button"
        onClick={(e) => {
          setIsOpen(!isOpen);
          e.stopPropagation();
        }}
        className="flex items-center gap-1 h-full whitespace-nowrap px-3 text-sm font-medium text-custom-text-300 hover:bg-custom-background-80 active:bg-custom-background-80 rounded transition-colors"
      >
        <span>Color</span>
        <span
          className={cn(
            "flex-shrink-0 size-6 grid place-items-center rounded border-[0.5px] border-custom-border-300",
            {
              "bg-custom-background-100": !activeBackgroundColor,
            }
          )}
          style={
            activeBackgroundColor
              ? {
                  backgroundColor: activeBackgroundColor.backgroundColor,
                }
              : {}
          }
        >
          <ALargeSmall
            className={cn("size-3.5", {
              "text-custom-text-100": !activeTextColor,
            })}
            style={
              activeTextColor
                ? {
                    color: activeTextColor.textColor,
                  }
                : {}
            }
          />
        </span>
      </button>
      {isOpen && (
        <section className="fixed top-full z-[99999] mt-1 rounded-md border-[0.5px] border-custom-border-300 bg-custom-background-100 p-2 space-y-2 shadow-custom-shadow-rg animate-in fade-in slide-in-from-top-1">
          <div className="space-y-1.5">
            <p className="text-xs text-custom-text-300 font-semibold">Text colors</p>
            <div className="flex items-center gap-2">
              {COLORS_LIST.map((color) => (
                <button
                  key={color.textColor}
                  type="button"
                  className="flex-shrink-0 size-6 rounded border-[0.5px] border-custom-border-400 hover:opacity-60 transition-opacity"
                  style={{
                    backgroundColor: color.textColor,
                  }}
                  onClick={() => TextColorItem(editor).command(color.textColor)}
                />
              ))}
              <button
                type="button"
                className="flex-shrink-0 size-6 grid place-items-center rounded text-custom-text-300 border-[0.5px] border-custom-border-400 hover:bg-custom-background-80 transition-colors"
                onClick={() => TextColorItem(editor).command(undefined)}
              >
                <Ban className="size-4" />
              </button>
            </div>
          </div>
          <div className="space-y-1.5">
            <p className="text-xs text-custom-text-300 font-semibold">Background colors</p>
            <div className="flex items-center gap-2">
              {COLORS_LIST.map((color) => (
                <button
                  key={color.backgroundColor}
                  type="button"
                  className="flex-shrink-0 size-6 rounded border-[0.5px] border-custom-border-400 hover:opacity-60 transition-opacity"
                  style={{
                    backgroundColor: color.backgroundColor,
                  }}
                  onClick={() => BackgroundColorItem(editor).command(color.backgroundColor)}
                />
              ))}
              <button
                type="button"
                className="flex-shrink-0 size-6 grid place-items-center rounded text-custom-text-300 border-[0.5px] border-custom-border-400 hover:bg-custom-background-80 transition-colors"
                onClick={() => BackgroundColorItem(editor).command(undefined)}
              >
                <Ban className="size-4" />
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};