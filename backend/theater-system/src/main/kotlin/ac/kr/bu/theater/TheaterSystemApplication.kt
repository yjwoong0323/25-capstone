package ac.kr.bu.theater



import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.ComponentScan
import org.springframework.data.jpa.repository.config.EnableJpaRepositories


@SpringBootApplication
@ComponentScan(basePackages = ["ac.kr.bu.theater"])
@EnableJpaRepositories(basePackages = ["ac.kr.bu.theater.repository"])
class TheaterSystemApplication

fun main(args: Array<String>) {
	runApplication<TheaterSystemApplication>(*args)
}
