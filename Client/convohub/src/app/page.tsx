"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-light min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
        <div className="container py-2">
          <Link
            href="/"
            className="navbar-brand fw-bold fs-4 text-dark"
          >
            Chat<span className="text-primary">App</span>
          </Link>

          <div className="d-flex gap-2">
            <Link
              href="/login"
              className="btn btn-outline-primary px-4"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="btn btn-primary px-4"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-5">
        <div className="container py-lg-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="badge bg-primary-subtle text-primary px-3 py-2 mb-3">
                Real-Time Messaging
              </span>

              <h1 className="display-3 fw-bold lh-1 mb-4">
                Connect.
                <br />
                Chat.
                <br />
                <span className="text-primary">Stay Connected.</span>
              </h1>

              <p className="lead text-secondary mb-4">
                A fast and secure real-time chat application where you
                can connect with friends, send messages instantly and
                see who's online.
              </p>

              <div className="d-flex flex-wrap gap-3">
                <Link
                  href="/register"
                  className="btn btn-primary btn-lg px-4"
                >
                  Get Started
                </Link>

                <Link
                  href="/login"
                  className="btn btn-outline-dark btn-lg px-4"
                >
                  Login
                </Link>
              </div>
            </div>

            {/* Chat Preview */}
            <div className="col-lg-6">
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                <div className="card-header bg-white border-0 p-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
                        style={{
                          width: "48px",
                          height: "48px",
                        }}
                      >
                        R
                      </div>

                      <div>
                        <h6 className="mb-0 fw-bold">Rahul</h6>
                        <small className="text-success">
                          ● Online
                        </small>
                      </div>
                    </div>

                    <span className="text-secondary">•••</span>
                  </div>
                </div>

                <div
                  className="card-body bg-light p-4"
                  style={{ minHeight: "360px" }}
                >
                  <div className="text-center mb-4">
                    <small className="text-secondary">
                      Today
                    </small>
                  </div>

                  {/* Received Message */}
                  <div className="d-flex mb-3">
                    <div className="bg-white shadow-sm rounded-4 px-3 py-2">
                      <p className="mb-1">
                        Hey! How are you?
                      </p>
                      <small className="text-secondary">
                        10:30 AM
                      </small>
                    </div>
                  </div>

                  {/* Sent Message */}
                  <div className="d-flex justify-content-end mb-3">
                    <div className="bg-primary text-white rounded-4 px-3 py-2">
                      <p className="mb-1">
                        I'm good! Working on my chat app 😄
                      </p>
                      <small className="opacity-75">
                        10:31 AM ✓✓
                      </small>
                    </div>
                  </div>

                  {/* Received Message */}
                  <div className="d-flex mb-3">
                    <div className="bg-white shadow-sm rounded-4 px-3 py-2">
                      <p className="mb-1">
                        That's great! 🔥
                      </p>
                      <small className="text-secondary">
                        10:31 AM
                      </small>
                    </div>
                  </div>

                  {/* Typing */}
                  <div className="d-flex align-items-center gap-2 mt-4">
                    <span className="badge bg-white text-secondary shadow-sm rounded-pill px-3 py-2">
                      Rahul is typing...
                    </span>
                  </div>
                </div>

                <div className="card-footer bg-white border-0 p-3">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control border-0 bg-light rounded-start-pill"
                      placeholder="Type a message..."
                      disabled
                    />

                    <button
                      className="btn btn-primary rounded-end-pill px-4"
                      disabled
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-5 bg-white">
        <div className="container py-5">
          <div className="text-center mb-5">
            <span className="text-primary fw-semibold">
              FEATURES
            </span>

            <h2 className="fw-bold mt-2">
              Everything you need to stay connected
            </h2>

            <p className="text-secondary">
              Built with modern technologies for a smooth
              real-time messaging experience.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm rounded-4 p-4">
                <div
                  className="bg-primary-subtle text-primary rounded-3 d-flex align-items-center justify-content-center mb-4"
                  style={{
                    width: "55px",
                    height: "55px",
                    fontSize: "24px",
                  }}
                >
                  ⚡
                </div>

                <h5 className="fw-bold">
                  Real-Time Chat
                </h5>

                <p className="text-secondary mb-0">
                  Send and receive messages instantly using
                  Socket.IO.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm rounded-4 p-4">
                <div
                  className="bg-success-subtle text-success rounded-3 d-flex align-items-center justify-content-center mb-4"
                  style={{
                    width: "55px",
                    height: "55px",
                    fontSize: "24px",
                  }}
                >
                  ●
                </div>

                <h5 className="fw-bold">
                  Online Status
                </h5>

                <p className="text-secondary mb-0">
                  See which friends are online and available
                  to chat.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm rounded-4 p-4">
                <div
                  className="bg-warning-subtle text-warning rounded-3 d-flex align-items-center justify-content-center mb-4"
                  style={{
                    width: "55px",
                    height: "55px",
                    fontSize: "24px",
                  }}
                >
                  ✓
                </div>

                <h5 className="fw-bold">
                  Seen Status
                </h5>

                <p className="text-secondary mb-0">
                  Know when your messages have been seen by
                  the receiver.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm rounded-4 p-4">
                <div
                  className="bg-danger-subtle text-danger rounded-3 d-flex align-items-center justify-content-center mb-4"
                  style={{
                    width: "55px",
                    height: "55px",
                    fontSize: "24px",
                  }}
                >
                  🔒
                </div>

                <h5 className="fw-bold">
                  Secure
                </h5>

                <p className="text-secondary mb-0">
                  JWT authentication keeps your account
                  protected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5">
        <div className="container py-5">
          <div className="bg-primary text-white rounded-4 p-5 text-center shadow">
            <h2 className="fw-bold mb-3">
              Ready to start chatting?
            </h2>

            <p className="mb-4 opacity-75">
              Create your account and start connecting with
              your friends.
            </p>

            <Link
              href="/register"
              className="btn btn-light btn-lg px-5"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            <div>
              <span className="fw-bold">
                Chat<span className="text-primary">App</span>
              </span>
            </div>

            <small className="text-secondary">
              © 2026 ChatApp. All rights reserved.
            </small>
          </div>
        </div>
      </footer>
    </main>
  );
}