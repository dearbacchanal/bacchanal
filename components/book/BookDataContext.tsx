"use client";

import React, { createContext, useContext } from "react";

interface BookData {
  textData: Record<string, string>;
  images: Record<string, string>;
  boxData: Record<string, { width?: number; height?: number; isVisible?: boolean; rotation?: number; x?: number; y?: number }>;
  dynamicBoxes: Record<string, string[]>; // pageId -> list of box IDs
}

interface BookDataContextType {
  data: BookData;
  isReadOnly: boolean;
  isLoading: boolean;
  updateBoxData: (id: string, settings: { width?: number; height?: number; isVisible?: boolean; rotation?: number; x?: number; y?: number }) => void;
  updateTextData: (id: string, value: string) => void;
  addDynamicBox: (pageId: string) => void;
  removeDynamicBox: (pageId: string, boxId: string) => void;
}

const BookDataContext = createContext<BookDataContextType>({
  data: { textData: {}, images: {}, boxData: {}, dynamicBoxes: {} },
  isReadOnly: false,
  isLoading: false,
  updateBoxData: () => { },
  updateTextData: () => { },
  addDynamicBox: () => { },
  removeDynamicBox: () => { },
});

export const useBookData = () => useContext(BookDataContext);

interface BookDataProviderProps {
  children: React.ReactNode;
  textData?: Record<string, string>;
  images?: Record<string, string>;
  boxData?: Record<string, { width?: number; height?: number; isVisible?: boolean; rotation?: number; x?: number; y?: number }>;
  dynamicBoxes?: Record<string, string[]>;
  isReadOnly?: boolean;
  isLoading?: boolean;
}

export const BookDataProvider: React.FC<BookDataProviderProps> = ({
  children,
  textData: initialTextData = {},
  images = {},
  boxData: initialBoxData = {},
  dynamicBoxes: initialDynamicBoxes = {},
  isReadOnly = false,
  isLoading = false,
}) => {
  const [textData, setTextData] = React.useState(initialTextData);
  const [boxData, setBoxData] = React.useState(initialBoxData);
  const [dynamicBoxes, setDynamicBoxes] = React.useState(initialDynamicBoxes);

  // Sync with initial props if they change
  React.useEffect(() => {
    setTextData(initialTextData);
  }, [initialTextData]);

  React.useEffect(() => {
    setBoxData(initialBoxData);
  }, [initialBoxData]);

  React.useEffect(() => {
    setDynamicBoxes(initialDynamicBoxes);
  }, [initialDynamicBoxes]);

  const updateBoxData = (id: string, settings: { width?: number; height?: number; isVisible?: boolean; rotation?: number; x?: number; y?: number }) => {
    setBoxData(prev => ({
      ...prev,
      [id]: { ...prev[id], ...settings }
    }));
  };

  const updateTextData = (id: string, value: string) => {
    setTextData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const addDynamicBox = async (pageId: string) => {
    const newBoxId = `dynamic-box-${Date.now()}`;
    const newPageBoxes = [...(dynamicBoxes[pageId] || []), newBoxId];

    // Initialize with percentage-based coordinates for responsiveness
    // 35% is a good starting point to appear near center
    const initialSettings = { x: 35, y: 35, rotation: 0, isVisible: true };

    setDynamicBoxes(prev => ({
      ...prev,
      [pageId]: newPageBoxes
    }));

    setBoxData(prev => ({
      ...prev,
      [newBoxId]: initialSettings
    }));

    // Save to DB
    try {
      // 1. Save to the list of IDs
      await fetch("/api/book-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fieldId: `dynamic-boxes-${pageId}`,
          value: JSON.stringify(newPageBoxes),
        }),
      });

      // 2. Save initial settings (position as %)
      await fetch("/api/book-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fieldId: `box-settings-${newBoxId}`,
          value: JSON.stringify(initialSettings),
        }),
      });
    } catch (error) {
      console.error("Error saving dynamic box:", error);
    }
  };

  const removeDynamicBox = async (pageId: string, boxId: string) => {
    const newPageBoxes = (dynamicBoxes[pageId] || []).filter(id => id !== boxId);

    setDynamicBoxes(prev => ({
      ...prev,
      [pageId]: newPageBoxes
    }));

    // Save to DB
    try {
      await fetch("/api/book-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fieldId: `dynamic-boxes-${pageId}`,
          value: JSON.stringify(newPageBoxes),
        }),
      });
    } catch (error) {
      console.error("Error removing dynamic box:", error);
    }
  };

  return (
    <BookDataContext.Provider
      value={{
        data: { textData, images, boxData, dynamicBoxes },
        isReadOnly,
        isLoading,
        updateBoxData,
        updateTextData,
        addDynamicBox,
        removeDynamicBox,
      }}
    >
      {children}
    </BookDataContext.Provider>
  );
};
