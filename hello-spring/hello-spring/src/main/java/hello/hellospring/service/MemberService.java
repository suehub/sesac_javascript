package hello.hellospring.service;

import hello.hellospring.domain.Member;
import hello.hellospring.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
public class MemberService {

   // private final MemberRepository memberRepository = new MemoryMemberRepository(); // testcase의 MemoryMemberRepository는 다른 인스턴스.
    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) { // 외부에서 넣어주도록
        this.memberRepository = memberRepository;
    }

    /*
    * 회원 가입
     */
    public Long join(Member member) {


        // 같은 이름이 있는 중복 회원 X
        // Optional<Member> result = memberRepository.findByName(member.getName());
        // optional 바로 반환 권장 X

        /* result.ifPresent(m -> {     // optional 안에 member 객체. get()으로 바로 꺼내는 것은 권장 X
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        });
         */

        validateDuplicateMember(member); // 중복 회원 검증
        memberRepository.save(member);
        return member.getId();
    }

    private void validateDuplicateMember(Member member) {
        memberRepository.findByName(member.getName()) // -> 결화는 Optional
                        .ifPresent(m -> {
                            throw new IllegalStateException("이미 존재하는 회원입니다.");
                        });
    }

    /* (서비스는 비즈니스 의존적 설계)
    * 전체 회원 조회
     */
    public List<Member> findMembers() {
        return memberRepository.findAll();
    }

    public Optional<Member> findOne(Long memberId) {
        return memberRepository.findById(memberId);
    }
}
