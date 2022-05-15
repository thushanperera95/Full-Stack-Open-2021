/* eslint-disable no-undef */
describe("Blog app", function () {
  beforeEach(function () {
    cy.resetAndCreateDefaultUsers({
      creatorUsername: "root",
      creatorName: "test",
      creatorPassword: "password",
      otherUsername: "other",
      otherName: "test other",
      otherPassword: "password",
    });
  });

  it("Login form is shown", function () {
    cy.contains("username");
    cy.contains("password");
    cy.get('input[id="input-username"]').should("exist");
    cy.get('input[id="input-password"]').should("exist");
    cy.get("button").contains("login");
  });

  describe("Login", function () {
    it("Succeeds with correct credentials", function () {
      cy.get('input[id="input-username"]').type("root");
      cy.get('input[id="input-password"]').type("password");
      cy.get("button").click();

      cy.contains("test logged in");
      cy.get("button").contains("logout");
      cy.get("button").contains("new blog");
    });

    it("fails with wrong credentials", function () {
      cy.get('input[id="input-username"]').type("root");
      cy.get('input[id="input-password"]').type("root");
      cy.get("button").click();

      cy.get(".notification").contains("invalid username or password");

      cy.get('input[id="input-username"]').should("be.empty");
      cy.get('input[id="input-password"]').should("be.empty");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "root", password: "password" });
    });

    it("a blog can be created", function () {
      cy.get('button:contains("new blog")').click();
      cy.get('input[id="input-title"]').type("test title");
      cy.get('input[id="input-author"]').type("test author");
      cy.get('input[id="input-url"]').type("test url");
      cy.get('button:contains("create")').click();

      cy.get(".notification").contains(
        "a new blog test title by test author added"
      );

      cy.get("#blogs-header").contains("Title");
      cy.get("#blogs-header").contains("Author");
      cy.get(".blogs-row").contains("test title");
      cy.get(".blogs-row").contains("test author");
    });

    describe("When there is an existing blog", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "test title",
          author: "test author",
          url: "test url",
        });

        cy.get("#button-nav-blogs").click();
      });

      it("user can click on a blog to view details", function () {
        cy.get("#blog-title-link").click();
        cy.get("#button-like").click();

        cy.get("#blog-title").contains("test title");
        cy.get("#blog-info").contains("test url");
        cy.get("#blog-info").contains("Likes 0");
        cy.get("#blog-info").contains("Added by test");
        cy.get("button").contains("delete");
      });

      describe("When viewing blog details", function () {
        beforeEach(function () {
          cy.get("#blog-title-link").click();
        });

        it("user can like a blog", function () {
          cy.get("#button-like").click();
          cy.get("#blog-info").contains("Likes 1");
        });

        it("creator can delete a blog", function () {
          cy.get("#button-delete").click();
          cy.get("#blog-info").should("not.exist");
        });

        it("creator can add a comment", function () {
          cy.get('input[id="input-comment"]').type("test comment");
          cy.get("#button-add-comment").click();

          cy.get('input[id="input-comment"]').should("be.empty");
          cy.get("#blog-comments").contains("test comment");
        });

        it("user cannot remove a blog that they did not create", function () {
          cy.get('button:contains("logout")').click();

          cy.get('input[id="input-username"]').type("other");
          cy.get('input[id="input-password"]').type("password");
          cy.get("button").click();

          cy.get("#blog-title-link").click();
          cy.get("#button-delete").should("not.exist");
        });

        it("anyone who is not the creator can also add a comment", function () {
          cy.get('button:contains("logout")').click();

          cy.get('input[id="input-username"]').type("other");
          cy.get('input[id="input-password"]').type("password");
          cy.get("button").click();

          cy.get("#blog-title-link").click();

          cy.get('input[id="input-comment"]').type("test comment");
          cy.get("#button-add-comment").click();

          cy.get('input[id="input-comment"]').should("be.empty");
          cy.get("#blog-comments").contains("test comment");
        });
      });
    });

    describe("When there are multiple blogs", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "The title with the second most likes",
          author: "test author",
          url: "test url",
          likes: "2",
        });
        cy.createBlog({
          title: "The title with the most likes",
          author: "test author",
          url: "test url",
          likes: "3",
        });
        cy.createBlog({
          title: "The title with the third most likes",
          author: "test author",
          url: "test url",
          likes: "1",
        });

        cy.get("#button-nav-blogs").click();
      });

      it("blogs are ordered by number of likes", function () {
        cy.get(".blogs-row")
          .eq(0)
          .should("contain", "The title with the most likes");
        cy.get(".blogs-row")
          .eq(1)
          .should("contain", "The title with the second most likes");
        cy.get(".blogs-row")
          .eq(2)
          .should("contain", "The title with the third most likes");
      });
    });

    describe("When there are multiple users", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "The title with the second most likes",
          author: "test author",
          url: "test url",
          likes: "2",
        });
        cy.createBlog({
          title: "The title with the most likes",
          author: "test author",
          url: "test url",
          likes: "3",
        });
        cy.createBlog({
          title: "The title with the third most likes",
          author: "test author",
          url: "test url",
          likes: "1",
        });
      });

      it("clicking on users will show all users and number of blogs they have created", function () {
        cy.get("#button-nav-users").click();

        cy.get("#users-header").contains("Name");
        cy.get("#users-header").contains("Blogs Created");

        cy.get(".users-row").eq(0).contains("test");
        cy.get(".users-row").eq(0).contains("3");

        cy.get(".users-row").eq(1).contains("test other");
        cy.get(".users-row").eq(1).contains("0");
      });

      it("user can click on a user to view details", function () {
        cy.get("#button-nav-users").click();

        cy.get("#user-title-link").eq(0).click();

        cy.get("#user-details-header").contains("Added Blogs");
        cy.get("#user-details-blogs").contains("The title with the most likes");
        cy.get("#user-details-blogs").contains(
          "The title with the second most likes"
        );
        cy.get("#user-details-blogs").contains(
          "The title with the third most likes"
        );
      });

      it("logout returns to the login page", function () {
        cy.get('button:contains("logout")').click();

        cy.get(".notification").contains("you have logged out");

        cy.get('input[id="input-username"]').should("be.empty");
        cy.get('input[id="input-password"]').should("be.empty");
      });
    });
  });
});
