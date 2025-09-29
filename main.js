// Initialize Feather Icons
feather.replace();

// Fetch GitHub repositories
async function fetchGitHubRepos() {
    try {
        const response = await fetch('https://api.github.com/users/shemilael/repos?sort=updated&per_page=6');
        const repos = await response.json();
        displayRepos(repos);
    } catch (error) {
        console.error('Error fetching repositories:', error);
        document.getElementById('repos-container').innerHTML = `
            <div class="col-span-full text-center py-12">
                <i data-feather="alert-circle" class="w-12 h-12 text-red-500 mx-auto mb-4"></i>
                <h3 class="text-xl font-semibold text-slate-800 mb-2">Unable to load projects</h3>
                <p class="text-slate-600">Please check back later or visit my GitHub directly</p>
                <a href="https://github.com/shemilael" target="_blank" class="mt-4 inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Visit GitHub Profile
                </a>
            </div>
        `;
        feather.replace();
    }
}

function displayRepos(repos) {
    const container = document.getElementById('repos-container');
    if (!repos || repos.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i data-feather="folder" class="w-12 h-12 text-slate-400 mx-auto mb-4"></i>
                <h3 class="text-xl font-semibold text-slate-800 mb-2">No projects found</h3>
                <p class="text-slate-600">Check back later for updates</p>
            </div>
        `;
        feather.replace();
        return;
    }
    container.innerHTML = repos.map(repo => `
        <div class="repo-card bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 animate-fade-in">
            <div class="p-6">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="text-xl font-bold text-slate-800">${repo.name}</h3>
                    <span class="flex items-center text-sm text-slate-500">
                        <i data-feather="star" class="w-4 h-4 mr-1"></i>
                        ${repo.stargazers_count}
                    </span>
                </div>
                <p class="text-slate-600 mb-6">
                    ${repo.description || 'No description available for this repository.'}
                </p>
                <div class="flex flex-wrap gap-2 mb-6">
                    ${repo.language ? `
                        <span class="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                            ${repo.language}
                        </span>
                    ` : ''}
                    <span class="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                        <i data-feather="git-branch" class="w-4 h-4 inline mr-1"></i>
                        ${repo.forks_count} forks
                    </span>
                </div>
                <a href="${repo.html_url}" target="_blank" 
                   class="w-full py-2 text-center bg-slate-100 hover:bg-primary hover:text-white rounded-lg transition-colors block font-medium">
                    View on GitHub
                </a>
            </div>
        </div>
    `).join('');
    feather.replace();
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchGitHubRepos();
});
