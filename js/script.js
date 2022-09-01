;(function () {
  const search = document.getElementById('search')
  const profile = document.getElementById('profile')
  const activated = document.querySelector('main')
  const socialLinks = document.getElementById('social-links')
  const projectUrl = document.querySelector('#project-text')
  const url = 'https://api.github.com/users'
  const client_id = 'Iv1.8f477e9a102bab59'
  const client_secret = '34c4988087e053f3d76666d1571252099aa8e17c'
  const count = 9
  const sort = 'created: asc'
  let timer = null

  async function getUser(user) {
    const profileResponse = await fetch(
      `${url}/${user}?client_id=${client_id}&client_secret=${client_secret}`
    )

    const repoResponse = await fetch(
      `${url}/${user}/repos?per_page=${count}&Sort=${sort}&client_id=${client_id}&client_secret=${client_secret}`
    )

    const profile = await profileResponse.json()
    const repos = await repoResponse.json()

    return { profile, repos }
  }

  function showProfile(user) {
    profile.innerHTML = `<section id="profile">
    <div class="profile-img">
      <img src="${user.avatar_url}" alt="photo-profile" />
    </div>
    <div class="profile-text">
      <h1>${user.name}</h1>
      <p>${user.bio}</p>
      <a href="${user.html_url}" target="_blank">Visualizar perfil</a>
    </div>
  </section>`

    socialLinks.innerHTML = ` <section id="social-links">
  <ul class="links">
    <li>
      <span
        ><svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
            stroke="#837E9F"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
            stroke="#837E9F"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <p>Local : ${user.location}</p>
    </li>
    <li>
      <span
        ><svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"
            stroke="#837E9F"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21"
            stroke="#837E9F"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <p>Repositories: ${user.public_repos}</p>
    </li>
    <li>
      <span
        ><svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="#837E9F"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2 12H22"
            stroke="#837E9F"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2V2Z"
            stroke="#837E9F"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <p>Followers: ${user.followers}</p>
    </li>
    <li>
      <span
        ><svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_102_22)">
            <path
              d="M16 22V18.13C16.0375 17.6532 15.9731 17.1738 15.811 16.7238C15.6489 16.2738 15.3929 15.8634 15.06 15.52C18.2 15.17 21.5 13.98 21.5 8.52C21.4997 7.12383 20.9627 5.7812 20 4.77C20.4559 3.54851 20.4236 2.19835 19.91 1C19.91 1 18.73 0.650001 16 2.48C13.708 1.85882 11.292 1.85882 9 2.48C6.27 0.650001 5.09 1 5.09 1C4.57638 2.19835 4.54414 3.54851 5 4.77C4.03013 5.7887 3.49252 7.14346 3.5 8.55C3.5 13.97 6.8 15.16 9.94 15.55C9.611 15.89 9.35726 16.2954 9.19531 16.7399C9.03335 17.1844 8.96681 17.6581 9 18.13V22M9 19C4 20.5 4 16.5 2 16L9 19Z"
              stroke="#837E9F"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_102_22">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </span>
      <p>${user.login}</p>
    </li>
    <li>
      <span
        ><svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8V8Z"
            stroke="#837E9F"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6 9H2V21H6V9Z"
            stroke="#837E9F"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
            stroke="#837E9F"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <a href="${user.blog}" target="_blank">Linkedin</a>
    </li>
  </ul>
</section>`

    projectUrl.innerHTML = `<a href="${user.html_url}" target="_blank" id="project-text" class="project-text">
    <div>
    <h2>My Projects</h2>
    <p>Veja Todos</p>
  </div>
  </a>`
  }

  function showRepos(repos) {
    let output = ''
    let technologies = new Set()

    repos.forEach(repo => {
      output += `<div class="projects-info">
      <a href="${repo.html_url}" class="my-project">
        <div class="my-project-title">
          <span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.3333 15.8333C18.3333 16.2754 18.1577 16.6993 17.8452 17.0118C17.5326 17.3244 17.1087 17.5 16.6667 17.5H3.33334C2.89131 17.5 2.46739 17.3244 2.15483 17.0118C1.84227 16.6993 1.66667 16.2754 1.66667 15.8333V4.16667C1.66667 3.72464 1.84227 3.30072 2.15483 2.98816C2.46739 2.67559 2.89131 2.5 3.33334 2.5H7.50001L9.16667 5H16.6667C17.1087 5 17.5326 5.17559 17.8452 5.48816C18.1577 5.80072 18.3333 6.22464 18.3333 6.66667V15.8333Z"
                stroke="#837E9F"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <h4>${repo.name}</h4>
        </div>
        <p>
          ${repo.description}
        </p>
        <div class="my-project-footer">
          <div class="my-project-footer-icon">
            <span
              ><svg
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 1.66667L12.575 6.88334L18.3333 7.725L14.1667 11.7833L15.15 17.5167L10 14.8083L4.85001 17.5167L5.83334 11.7833L1.66667 7.725L7.42501 6.88334L10 1.66667Z"
                  stroke="#837E9F"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <p>${repo.stargazers_count}</p>
            <span
              ><svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 2.5V12.5"
                  stroke="#837E9F"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15 7.5C16.3807 7.5 17.5 6.38071 17.5 5C17.5 3.61929 16.3807 2.5 15 2.5C13.6193 2.5 12.5 3.61929 12.5 5C12.5 6.38071 13.6193 7.5 15 7.5Z"
                  stroke="#837E9F"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5 17.5C6.38071 17.5 7.5 16.3807 7.5 15C7.5 13.6193 6.38071 12.5 5 12.5C3.61929 12.5 2.5 13.6193 2.5 15C2.5 16.3807 3.61929 17.5 5 17.5Z"
                  stroke="#837E9F"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15 7.5C15 9.48912 14.2098 11.3968 12.8033 12.8033C11.3968 14.2098 9.48912 15 7.5 15"
                  stroke="#837E9F"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <p>${repo.forks_count}</p>
          </div>
          <p>${repo.language}</p>
        </div>
        </a>
    </div>`

      technologies.add(repo.language)
    })

    const tecList = [...technologies]
      .map(item => {
        if (!item) return
        return `<li>${item}</li>`
      })
      .join(' ')

    document.getElementById('projects-info').innerHTML = output
    document.getElementById('technologies-info').innerHTML = tecList
  }

  search.addEventListener('keyup', e => {
    clearTimeout(timer)
    timer = setTimeout(function () {
      const user = e.target.value

      if (user.length > 2) {
        getUser(user).then(res => {
          showProfile(res.profile)
          showRepos(res.repos)
        })
        activated.classList.remove('disabled')
      } else {
        activated.classList.add('disabled')
      }
    }, 500)
  })
})()

const html = document.querySelector('html')
const check = document.querySelector('#checkbox')
check.addEventListener('change', function () {
  html.classList.toggle('dark')
})
