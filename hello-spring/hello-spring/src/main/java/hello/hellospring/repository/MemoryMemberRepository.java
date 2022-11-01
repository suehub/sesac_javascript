package hello.hellospring.repository;

import hello.hellospring.domain.Member;
import org.springframework.stereotype.Repository;

import java.util.*;


public class MemoryMemberRepository implements MemberRepository {

    private static Map<Long, Member> store = new HashMap<>();
    private static long sequence = 0L;

    @Override
    public Member save(Member member) {
        member.setId(++sequence);
        store.put(member.getId(), member);
        return member;
    }

    @Override
    public Optional<Member> findById(Long id) {
        return Optional.ofNullable(store.get(id));  // null일 경우 optional로 감싸 반환
    }

    @Override
    public Optional<Member> findByName(String name) {
        return store.values().stream()
                 .filter(member -> member.getName().equals(name))
                 .findAny();     // loop 돌면서 찾으면 반환
    }

    @Override
    public List<Member> findAll() {

        return new ArrayList<>(store.values()); // member들이 반환
    }

    public void clearStore() {
        store.clear();
    }
}
