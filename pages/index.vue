<script setup></script>

<template>
  <div class="container mx-auto px-8">
    <main class="my-8 space-y-4">
      <h1 class="text-3xl">
        Hi, I'm <em>devmor</em> <br />Welcome to <strong>Femex</strong>!
      </h1>
      <h2 class="text-lg">
        This website exists only to showcase one of my recent frontend works
        with
        <a href="https://nuxt.com/" class="link" rel="noopener" target="_blank"
          >Nuxt</a
        >
        and
        <a
          href="https://tailwindcss.com/"
          class="link"
          rel="noopener"
          target="_blank"
          >TailwindCSS</a
        >.
        <br />
        <p class="my-2">
          I'm currently available for hiring. Thanks for visiting this website and have fun.
        </p>
      </h2>

      <button class="btn group">
        <NuxtLink to="/trade/BTCUSD">
          Femex Orderbook & Recent Trades
          <small class="arrow">&#129146;</small>
        </NuxtLink>
      </button>
    </main>

    <footer class="flex flex-col gap-4 items-start">
      <p>
        Source Code (GitHub):
        <a
          href="https://github.com/devmor-j/femex"
          rel="noopener"
          target="_blank"
        >
          <em class="emphasis">devmor-j</em>
        </a>
      </p>

      <p>
        Email:
        <a href="mailto:devmor.j@gmail.com" rel="noopener" target="_blank">
          <em class="emphasis">devmor.j@gmail.com</em>
        </a>
      </p>
    </footer>
  </div>
</template>
