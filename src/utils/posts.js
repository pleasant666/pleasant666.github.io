const postModules = import.meta.glob('/posts/*.md')

function pathToSlug(path) {
  const filename = path.split('/').pop().replace('.md', '')
  return filename.replace(/^\d{4}-\d{2}-\d{2}-/, '')
}

function pathToDate(path) {
  const filename = path.split('/').pop()
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})/)
  return match ? match[1] : null
}

export async function getAllPosts() {
  const posts = []

  for (const [path, importFn] of Object.entries(postModules)) {
    const module = await importFn()
    const { frontmatter } = module.default
    const slug = pathToSlug(path)
    const dateFromPath = pathToDate(path)

    posts.push({
      slug,
      title: frontmatter.title || slug,
      date: frontmatter.date || dateFromPath || '',
      summary: frontmatter.summary || '',
      tags: frontmatter.tags || [],
      path
    })
  }

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}

export async function getPostBySlug(slug) {
  for (const [path, importFn] of Object.entries(postModules)) {
    if (pathToSlug(path) === slug) {
      const module = await importFn()
      const { frontmatter, html } = module.default
      const dateFromPath = pathToDate(path)

      return {
        slug,
        title: frontmatter.title || slug,
        date: frontmatter.date || dateFromPath || '',
        summary: frontmatter.summary || '',
        tags: frontmatter.tags || [],
        html
      }
    }
  }
  return null
}
