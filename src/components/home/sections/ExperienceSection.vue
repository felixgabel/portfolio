<script setup lang="ts">
type Project = {
  id: number
  title: string
  dateStart: Date
  dateEnd: Date
  description: string
  link: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Portfolio Webseite',
    dateStart: new Date(2026, 4),
    dateEnd: new Date(2026, 7),
    description:
      'Das Portfolio, das du gerade besuchst, ist ein Projekt, das ich mit Vue 3, TypeScript und Tailwind CSS entwickelt habe. Es dient als Plattform, um meine Fähigkeiten und Erfahrungen als Frontend-Entwickler zu präsentieren.',
    link: 'https://github.com/felixgabel/portfolio',
  },
  {
    id: 2,
    title: 'ezSheets',
    dateStart: new Date(2022, 0),
    dateEnd: new Date(2025, 11),
    description:
      'ezSheets ist eine Webanwendung, mit der man Musiksheets erstellen und verwalten kann. Setlisten können erstellt, bearbeitet und geteilt werden. Das Frontend wurde mit Vue 3, TypeScript und Vuetify entwickelt.',
    link: 'https://ezsheets.net',
  },
]

function formatDateOfGivenProject(id: number): string {
  const project = projects.find((project) => project.id === id)
  if (!project) throw new Error(`Project with id ${id} not found`)

  const startYear = project.dateStart.getFullYear()
  const endYear = project.dateEnd.getFullYear()
  const startMonth = project.dateStart.toLocaleString('de-DE', { month: 'long' })
  const endMonth = project.dateEnd.toLocaleString('de-DE', { month: 'long' })

  const spansMultipleYears = startYear !== endYear

  if (spansMultipleYears) {
    return `${startYear} – ${endYear}`
  } else {
    return `${startMonth} – ${endMonth} ${endYear}`
  }
}

const projectsSortedByDateEnd = [...projects].sort(
  (a, b) => b.dateEnd.getTime() - a.dateEnd.getTime(),
) // most recent first
</script>

<template>
  <ol class="group/list flex flex-col gap-12">
    <li
      v-for="project in projectsSortedByDateEnd"
      :key="project.id"
      class="group relative grid transition-opacity motion-reduce:transition-none lg:group-hover/list:opacity-50 lg:hover:opacity-100"
    >
      <div
        class="absolute -inset-6 -z-1 hidden rounded-xl opacity-0 shadow-[0_0_5px_0_rgb(0_0_0/.075)] inset-shadow-[0_0_22px_0_rgb(255_255_255/.75)] drop-shadow-sm/12 backdrop-blur-[1.3px] transition-opacity group-hover:opacity-100 motion-reduce:transition-none lg:block"
        aria-hidden="true"
      ></div>

      <header
        class="mt-1 mb-2 text-xs font-semibold tracking-wide text-neutral-500 uppercase sm:col-span-2"
      >
        {{ formatDateOfGivenProject(project.id) }}
      </header>

      <div class="sm:col-span-6">
        <h3 class="text-lg leading-snug font-semibold text-neutral-900 dark:text-neutral-100">
          <a
            :href="project.link"
            target="_blank"
            rel="noopener noreferrer"
            class="group/link inline-flex items-baseline leading-tight"
            :aria-label="`${project.title} (öffnet in neuem Tab)`"
          >
            <span class="absolute -inset-6 hidden rounded lg:block"
              ><!-- this element has to have the same inset as the glass div --></span
            >
            <span>
              {{ project.title }}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 motion-reduce:transition-none"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </a>
        </h3>
        <p class="mt-2 text-sm leading-normal">
          {{ project.description }}
        </p>
      </div>
    </li>
  </ol>
</template>
