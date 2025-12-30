"use client";

import React, { createContext, useContext } from "react";

interface BookData {
  textData: Record<string, string>;
  images: Record<string, string>;
}

interface BookDataContextType {
  data: BookData;
  isReadOnly: boolean;
  isLoading: boolean;
}

const BookDataContext = createContext<BookDataContextType>({
  data: { textData: {}, images: {} },
  isReadOnly: false,
  isLoading: false,
});

export const useBookData = () => useContext(BookDataContext);

interface BookDataProviderProps {
  children: React.ReactNode;
  textData?: Record<string, string>;
  images?: Record<string, string>;
  isReadOnly?: boolean;
  isLoading?: boolean;
}

export const BookDataProvider: React.FC<BookDataProviderProps> = ({
  children,
  textData = {},
  images = {},
  isReadOnly = false,
  isLoading = false,
}) => {
  return (
    <BookDataContext.Provider
      value={{
        data: { textData, images },
        isReadOnly,
        isLoading,
      }}
    >
      {children}
    </BookDataContext.Provider>
  );
};
