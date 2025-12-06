package ac.kr.bu.theater

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration
import org.springframework.boot.runApplication

@SpringBootApplication(exclude = [RedisAutoConfiguration::class])
class TheaterSystemApplication

fun main(args: Array<String>) {
	runApplication<TheaterSystemApplication>(*args)
}
