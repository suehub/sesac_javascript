package hello.hellospring.repository;

import hello.hellospring.domain.Member;

import java.util.List;
import java.util.Optional;

public interface MemberRepository {
    Member save(Member member);
    Optional<Member> findById(Long id); // null을 optional로 감싸서 반환. java8의 기능
    Optional<Member> findByName(String name);
    List<Member> findAll(); // 모든 회원 리스트 반환
    
}
