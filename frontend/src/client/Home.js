import { React, useState, useEffect } from "react";
import axios from "axios";
import Book from "./Book";
import Header from "../header/Header";

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (!user) {
      window.location.href = "http://localhost:3000/login";
    }
    axios
      .get("http://localhost:8080/api/books")
      .then((data) => {
        setBooks(data.data.reverse());
      })
      .catch((err) => console.log(err));
  }, []);
  function linkImg(name) {
    let url = "http://localhost:8080/api/files/" + name;
    return url;
  }

  return (
    <>
      <Header />
      <div className="container" style={{ marginTop: "70px" }}>
        <h2 className="text-center mt-3">All Items</h2>
        <section className="py-4 container">
          <div className="row justify-content-center">
            {books.map((book, index) => {
              return (
                <Book
                  key={index}
                  id={book.id}
                  img={linkImg(book.imageFeatureBooks[0].url)}
                  title={book.title}
                  author={book.author}
                  desc={book.description}
                  price={book.price}
                  book={book}
                />
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
