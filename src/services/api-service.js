export default class Api {
  apiBase = `https://conduit-api-realworld.herokuapp.com/`;

  token;

  user;

  headersWithAuth = {
    'content-type': 'application/json',
    Authorization: `Token ${localStorage.getItem('Token')}`,
  };

  saveTokenAndUser(token, user) {
    this.token = localStorage.setItem('Token', JSON.stringify(token));
    this.user = localStorage.setItem('User', JSON.stringify(user));
  }

  async getArticlesList(offset) {
    const res = await fetch(`${this.apiBase}articles/?offset=${offset}&limit=5`);
    const data = await res.json();
    return data;
  }

  async getOneArticle(slug) {
    const res = await fetch(`${this.apiBase}articles/${slug}`);
    return res.json();
  }

  async authenticationOfUser(email, password) {
    const user = {
      user: {
        email,
        password,
      },
    };

    const res = await fetch(`${this.apiBase}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(user),
    });
    if (res.ok) {
      const data = await res.json();
      const dataToken = data.user.token;
      const currentUser = data.user;
      this.saveTokenAndUser(dataToken, currentUser);
      return data;
    }
    throw new Error('Request failed');
  }

  async registrationOfUser(username, email, password) {
    const res = await fetch(`${this.apiBase}users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
        },
      }),
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    throw new Error('Request failed');
  }

  async editUser(userData) {
    if (!userData) throw new Error('Missing data');
    const user = {
      ...userData,
    };
    const res = await fetch(`${this.apiBase}user`, {
      method: 'PUT',
      headers: this.headersWithAuth,
      body: JSON.stringify(user),
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    throw new Error('Request failed');
  }

  async sendNewArticle(article) {
    const res = await fetch(`${this.apiBase}articles`, {
      method: 'POST',
      headers: this.headersWithAuth,
      body: JSON.stringify({
        article,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    throw new Error('Request failed');
  }

  async sendEditedArticle(article, slug) {
    const res = await fetch(`${this.apiBase}articles/${slug}`, {
      method: 'PUT',
      headers: this.headersWithAuth,
      body: JSON.stringify({
        article,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    throw new Error('Request failed');
  }

  async deleteArticle(slug) {
    const res = await fetch(`${this.apiBase}articles/${slug}`, {
      method: 'DELETE',
      headers: this.headersWithAuth,
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    throw new Error('Request failed');
  }

  async setFavoriteArticle(slug) {
    const res = await fetch(`${this.apiBase}articles/${slug}/favorite`, {
      method: 'POST',
      headers: this.headersWithAuth,
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    throw new Error('Request failed');
  }

  async setUnFavoriteArticle(slug) {
    const res = await fetch(`${this.apiBase}articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: this.headersWithAuth,
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    throw new Error('Request failed');
  }
}
