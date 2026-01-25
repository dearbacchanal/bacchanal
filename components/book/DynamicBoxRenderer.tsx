"use client";

import React from "react";
import { useBookData } from "./BookDataContext";
import { ImageBox } from "../ui/ImageBox";

interface DynamicBoxRendererProps {
    pageId: string;
}

export const DynamicBoxRenderer: React.FC<DynamicBoxRendererProps> = ({ pageId }) => {
    const { data } = useBookData();
    const boxIds = data.dynamicBoxes[pageId] || [];

    return (
        <div className="absolute inset-0 pointer-events-none z-40 flex flex-col md:block items-center gap-12 pt-20 pb-20 md:pt-0 md:pb-0 overflow-y-auto md:overflow-visible">
            {boxIds.map((id) => (
                <ImageBox
                    key={id}
                    id={id}
                    pageId={pageId}
                    rotation="rotate-[0deg]"
                    className="md:absolute pointer-events-auto" // Absolute on desktop, interactive everywhere
                />
            ))}
        </div>
    );
};
