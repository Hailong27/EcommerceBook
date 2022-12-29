package com.example.library_pr.repositories;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.library_pr.models.Book;
import com.example.library_pr.models.Rating;
import com.example.library_pr.models.User;


public interface RatingRepository extends JpaRepository<Rating, Long> {
  List<Rating> findByBookId(Long bookId);
  List<Rating> findByUserAndBook(User user,Book book);
  @Transactional
  void deleteByBookId(long bookId);
}