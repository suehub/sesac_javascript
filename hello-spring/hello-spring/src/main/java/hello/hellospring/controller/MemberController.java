package hello.hellospring.controller;

import hello.hellospring.domain.Member;
import hello.hellospring.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.awt.*;
import java.util.List;

@Controller // MemberController 객체를 생성하여 컨테이너에 넣어둠, 스프링이 관리
public class MemberController {

    // private final MemberService memberService = new MemberService(); // 여러 곳에서 사용됨. 여러 개 사용할 필요 X
    private final MemberService memberService;  // 컨테이너에 등록하고 사용

    @Autowired  // 생성자에 Autowired가 있으면 스프링이 컨테이너에 있는 memberService를 가져와서 '연결'해줌
    public MemberController(MemberService memberService) {

        this.memberService = memberService;
        System.out.println("memberService = " + memberService.getClass());
    }

    @GetMapping("/members/new")
    public String createForm() {
        return "members/createMemberForm";  // 이동함
    }

    @PostMapping("/members/new")
    public String create(MemberForm form) {
        Member member = new Member();
        member.setName(form.getName());

        // System.out.println("member = " + member.getName());

        memberService.join(member);

        return "redirect:/";
    }

    @GetMapping("/members")
    public String list(Model model) {
        List<Member> members = memberService.findMembers();
        model.addAttribute("members", members);
        return "members/memberList";
    }
}
