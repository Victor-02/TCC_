package com.tcc.tccbackend.TestController;

import static io.restassured.RestAssured.*;

public class BaseTest {
    public BaseTest(){
        baseURI = "http://localhost";
        port = 8080;
        basePath = "/api";
    }
}
