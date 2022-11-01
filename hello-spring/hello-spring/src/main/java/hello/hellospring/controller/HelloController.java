package hello.hellospring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HelloController {

    @GetMapping
    public String hello(Model model) {
        model.addAttribute("data", "hello!");
        return "hello";
    }

    @GetMapping("hello-mvc")
    public String helloMvc(@RequestParam("name") String name, Model model) {
        model.addAttribute("name", name); // 키, 파라미터
        return "hello-template";
    }

    @GetMapping("hello-string")
    @ResponseBody    // http에서 바디부의 데이터를 직접 넣어주겠다는 뜻.
    public String helloString(@RequestParam("name") String name) {
        return "hello" + name;  // "hello spring!" 뷰 없이. 소스 코드보면 데어티, 문자 그대로.
    }

    @GetMapping("hello-api")
    @ResponseBody
    public Hello helloApi(@RequestParam("name") String name) {
        Hello hello = new Hello();
        hello.setNmae(name);
        return hello;
    }

    static class Hello {
        private String name;

        public String getName() {
            return name;
        }
        public void setNmae(String name) {
            this.name = name;

        }

    }
}
