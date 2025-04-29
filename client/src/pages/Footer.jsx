import React from 'react'

const Footer = () => {
  return (
      <section className="mt-10">
          <footer className="bg-gray-200 text-gray-700 px-6 py-10">
              <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                  {/* Brand Section */}
                  <div>
                      <h2 className="text-xl font-bold mb-2">LUXE</h2>
                      <p className="text-sm">
                          Curated collections of premium products for your
                          lifestyle.
                      </p>
                  </div>

                  {/* Shop Links */}
                  <div>
                      <h3 className="text-sm font-semibold mb-3">Shop</h3>
                      <ul className="space-y-2 text-sm">
                          <li>
                              <a href="#" className="hover:underline">
                                  All Products
                              </a>
                          </li>
                          <li>
                              <a href="#" className="hover:underline">
                                  Categories
                              </a>
                          </li>
                          <li>
                              <a href="#" className="hover:underline">
                                  Featured
                              </a>
                          </li>
                          <li>
                              <a href="#" className="hover:underline">
                                  New Arrivals
                              </a>
                          </li>
                      </ul>
                  </div>

                  {/* About Links */}
                  <div>
                      <h3 className="text-sm font-semibold mb-3">About</h3>
                      <ul className="space-y-2 text-sm">
                          <li>
                              <a href="#" className="hover:underline">
                                  Our Story
                              </a>
                          </li>
                          <li>
                              <a href="#" className="hover:underline">
                                  Contact Us
                              </a>
                          </li>
                          <li>
                              <a href="#" className="hover:underline">
                                  Careers
                              </a>
                          </li>
                          <li>
                              <a href="#" className="hover:underline">
                                  Press
                              </a>
                          </li>
                      </ul>
                  </div>

                  {/* Customer Service */}
                  <div>
                      <h3 className="text-sm font-semibold mb-3">
                          Customer Service
                      </h3>
                      <ul className="space-y-2 text-sm">
                          <li>
                              <a href="#" className="hover:underline">
                                  FAQ
                              </a>
                          </li>
                          <li>
                              <a href="#" className="hover:underline">
                                  Shipping & Returns
                              </a>
                          </li>
                          <li>
                              <a href="#" className="hover:underline">
                                  Terms & Conditions
                              </a>
                          </li>
                          <li>
                              <a href="#" className="hover:underline">
                                  Privacy Policy
                              </a>
                          </li>
                      </ul>
                  </div>
              </div>

              {/* Bottom Bar */}
              <div className="max-w-screen-xl mx-auto mt-10 border-t border-gray-300 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm">
                  <p className="mb-4 sm:mb-0">
                      &copy; 2025 LUXE. All rights reserved.
                  </p>
                  <div className="flex space-x-4">
                      <a href="#" className="hover:underline">
                          Instagram
                      </a>
                      <a href="#" className="hover:underline">
                          Twitter
                      </a>
                      <a href="#" className="hover:underline">
                          Facebook
                      </a>
                      <a href="#" className="hover:underline">
                          Pinterest
                      </a>
                  </div>
              </div>

              <p className="py-3 hover:underline">made by arbaz 💖</p>
          </footer>
      </section>
  );
}

export default Footer