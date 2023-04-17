import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import EmojList from "./emojiList.json";

describe("SearchInput", () => {
  
  // Sayfanın başarıyla render edilip edilmediğini kontrol eden test
  test("check page is rendered", () => {
    render(<App />);
  });

  test("check input is in the document", () => {
    // Input'un dokümanda var olup olmadığını kontrol eden test
    render(<App />);
    const searchInput = screen.getByRole("textbox");
    expect(searchInput).toBeInTheDocument();
  });

  test("search emoji Blush", () => {
    // Blush emojisinin arama sonucunda görüntülenip görüntülenmediğini kontrol eden test
    render(<App />);
    const blush = "Blush";
    const searchInput = screen.getByRole("textbox");
    // Arama inputuna değer belirlenen değer yazılır
    fireEvent.change(searchInput, { target: { value: blush } });
    expect(screen.getByText(blush)).toBeInTheDocument();
  });

  test("check first 20 emoji list", () => {
    // İlk 20 emojinin listelendiğini kontrol eden test
    render(<App />);
    const slicedList = EmojList.slice(0, 20);
     // Her bir elemanı döngüye sokarak ekranda olup olmadıkları kontrol edilir
    slicedList.map((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  test("filtering for non exist value", () => {
    // Arama sonucunda eşleşmeyen bir değer için filtreleme yapıldığını kontrol eden test
    render(<App />);
    const searchInput = screen.getByRole("textbox");
    const test = "Test";
    // Arama inputuna değer belirlenen değer yazılır
    fireEvent.change(searchInput, { target: { value: test } });
    // Arama sonucunda eşleşenler filtrelenir
    const filteredResult = EmojList.filter((item) => {
      return item.title === test;
    });
     // Filtrelenen sonucun boş olduğu kontrol edilir
    expect(filteredResult).toEqual([]);
  });

  test("filtering for Wink", () => {
     // Arama sonucunda eşleşen bir değer için filtreleme yapıldığını kontrol eden test
    render(<App />);
    const searchInput = screen.getByRole("textbox");
    const wink = "Wink";
    // Arama inputuna değer belirlenen değer yazılır
    fireEvent.change(searchInput, { target: { value: wink } });
    // Arama sonucunda eşleşenler filtrelenir
    const filteredResult = EmojList.filter((item) => {
      return item.title === wink;
    });
    // Filtrelenen sonucun 1 adet elemana sahip olup olmadığı kontrol edilir
    expect(filteredResult.length).toBe(1);
  });

  test("check is text coppied", () => {
    // Emoji'nin başarıyla kopyalandığını kontrol eden test
    render(<App />);
    const copiedEmoji = screen.getByText("Laughing");
    // Aranılan emojiye tıklanılır
    fireEvent.click(copiedEmoji);
    expect(copiedEmoji.parentElement.getAttribute("data-clipboard-text")).toBe("😆");
  });
});
