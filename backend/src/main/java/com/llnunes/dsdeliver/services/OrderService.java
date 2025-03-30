package com.llnunes.dsdeliver.services;

import com.llnunes.dsdeliver.dto.OrderDTO;
import com.llnunes.dsdeliver.dto.ProductDTO;
import com.llnunes.dsdeliver.entities.Order;
import com.llnunes.dsdeliver.entities.Product;
import com.llnunes.dsdeliver.entities.enums.OrderStatus;
import com.llnunes.dsdeliver.repository.OrderRepository;
import com.llnunes.dsdeliver.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository repository;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository repository, ProductRepository productRepository) {
        this.repository = repository;
        this.productRepository = productRepository;
    }

    @Transactional(readOnly = true)
    public List<OrderDTO> findAll() {
        var list = repository.findOrdersWithProducts();
        return list.stream().map(OrderDTO::new).collect(Collectors.toList());
    }

    @Transactional
    public OrderDTO insert(OrderDTO dto) {
        Order order = new Order();
        order.setAddress(dto.getAddress());
        order.setLatitude(dto.getLatitude());
        order.setLongitude(dto.getLongitude());
        order.setMoment(Instant.now());
        order.setStatus(OrderStatus.PENDING);

//        for (ProductDTO p : dto.getProducts()) {
//            var product = productRepository.findById(p.getId());
//            order.getProducts().add(product.get());
//        }

        dto.getProducts().stream()
                .map(ProductDTO::getId)
                .map(productRepository::findById)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .forEach(order.getProducts()::add);

        repository.save(order);
        return new OrderDTO(order);
    }
}
