package mekura.api.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.List;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Value("{application.url}")
    private String serverUrl;

    @Override
    public void addCorsMappings(CorsRegistry registry){
        List<String> origins = new ArrayList<>();

        String[] serverUrls=serverUrl.split(",");

        for(int i=0;i<=9;i++){
            origins.add("http://localhost:300"+i);
            origins.add("http://172.17.89.177:300"+i);
        }

        for(String url:serverUrls){
            origins.add(url);
        }

        for(String domain: origins){
            System.out.println("Authorized domain : "+domain);
        }

        registry.addMapping("/**").allowedOrigins(origins.toArray(new String[0])).allowedMethods("POST","GET","OPTIONS","DELETE").allowedHeaders("*");
    }

}
