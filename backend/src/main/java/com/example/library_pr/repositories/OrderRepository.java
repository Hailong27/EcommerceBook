package com.example.library_pr.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.library_pr.models.Book;
import com.example.library_pr.models.Cart;
import com.example.library_pr.models.Order;
import com.example.library_pr.models.Rating;
import com.example.library_pr.models.User;


@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {
} 