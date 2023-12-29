plugins {
    kotlin("jvm") version "1.9.21"
    application
}

group = "guru.stefma.vekt"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    implementation("io.ktor:ktor-server-core:2.3.7")
    implementation("io.ktor:ktor-server-netty:2.3.7")
}

kotlin {
    jvmToolchain(11)
}

application {
    mainClass.set("guru.stefma.vekt.HandlerKt")
}