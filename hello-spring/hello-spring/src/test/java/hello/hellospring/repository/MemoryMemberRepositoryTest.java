package hello.hellospring.repository;

import hello.hellospring.domain.Member;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

// TestCase 작성. (테스트케이스 먼저 작성, 코딩으로 뒤집어서 작성할 수도 있음. -> 테스트 주도 개발 TDD)
// 테스트 코드없이 개발은 힘듦. 테스트 관련 공부 필요.
class MemoryMemberRepositoryTest {

    MemoryMemberRepository repository = new MemoryMemberRepository();

    @AfterEach // callback method. save() 끝나고 호출. findByName() 끝나고도 호출.
    public void afterEach() {
        repository.clearStore();
    }


    @Test
    public void save() {
        Member member = new Member();
        member.setName("spring");

        repository.save(member);

        Member result = repository.findById(member.getId()).get(); // optional 꺼내기 get()
        // System.out.println("result = " + (result == member));
        // Assertions.assertEquals(member, result);    // org.junit 다를 경우 오류
        assertThat(member).isEqualTo(result);     // org.assert member와 result가 같은가.
                                                  // static import -> assertTha t바로 사용 가능

    }

    @Test
    public void findByName() {
        Member member1 = new Member();
        member1.setName("spring1");
        repository.save(member1);

        Member member2 = new Member();
        member2.setName("spring2");
        repository.save(member2);

        Member result = repository.findByName("spring1").get();

        assertThat(result).isEqualTo(member1);
    }

    @Test
    public void findAll() {     // 재실행할 떄 먼저 실행. 오류 뜸. test 끝나면 data clean이 필요. (중요)
        Member member1 = new Member();
        member1.setName("spring1");
        repository.save(member1);

        Member member2 = new Member();
        member2.setName("spring2");
        repository.save(member2);

        List<Member> result = repository.findAll();

        assertThat(result.size()).isEqualTo(2);

    }
}
