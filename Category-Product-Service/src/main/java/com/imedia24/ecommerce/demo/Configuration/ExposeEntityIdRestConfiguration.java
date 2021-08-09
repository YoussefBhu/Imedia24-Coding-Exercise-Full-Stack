package com.imedia24.ecommerce.demo.Configuration;

import com.imedia24.ecommerce.demo.Entities.Product;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;



@Component
public class ExposeEntityIdRestConfiguration implements RepositoryRestConfigurer {
    //to expose the id of an entity in the response in case we need it
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        config.exposeIdsFor(Product.class);
    }
}
