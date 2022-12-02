package com.uet.productionmove;

import com.uet.productionmove.entity.*;
import com.uet.productionmove.repository.BatchRepository;
import com.uet.productionmove.repository.ProductLineRepository;
import com.uet.productionmove.repository.ProductRepository;
import com.uet.productionmove.repository.StockRepository;
import org.hibernate.engine.jdbc.batch.spi.Batch;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.ApplicationContext;

@SpringBootApplication()
public class App {
    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(App.class, args);
    }
}
