<template>
  <div class="inventory-page">

    <!-- Sidebar Toggle -->
    <button
      class="sidebar-toggle"
      @click="sidebarOpen = true"
      aria-label="Open sidebar"
    >
      <i class="fas fa-bars"></i>
    </button>

    <!-- Overlay -->
    <div
      class="overlay"
      :class="{ show: sidebarOpen }"
      @click="sidebarOpen = false"
    ></div>

    <!-- Sidebar -->
    <nav class="sidebar" :class="{ show: sidebarOpen }">
      <div class="sidebar-header">
        <div class="brand-icon">
          <i class="fas fa-car"></i>
        </div>

        <div>
          <h4>OBerlo</h4>
          <p>Inventory Management</p>
        </div>
      </div>

      <ul class="sidebar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/">
            <i class="fas fa-home"></i>
            <span>Home</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/dashboard">
            <i class="fas fa-chart-line"></i>
            <span>Dashboard</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/products">
            <i class="fas fa-car"></i>
            <span>Inventory</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/purchases">
            <i class="fas fa-truck"></i>
            <span>Purchase Orders</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/sales">
            <i class="fas fa-dollar-sign"></i>
            <span>Vehicle Sales</span>
          </router-link>
        </li>

        <li class="nav-item logout-btn">
          <a
            class="nav-link"
            href="#"
            @click.prevent="handleLogout"
          >
            <i class="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </nav>

    <!-- Main Content -->
    <main class="main-content">

      <div class="inventory-container">

        <!-- Page Header -->
        <section class="page-header">
          <div class="header-text">
            <span class="eyebrow">
              <i class="fas fa-layer-group"></i>
              INVENTORY MANAGEMENT
            </span>

            <h1>
              <i class="fas fa-car"></i>
              Vehicle Inventory
            </h1>

            <p>
              Manage your vehicle stock, pricing, specifications and images
              from one place.
            </p>
          </div>

          <button
            type="button"
            class="btn-add"
            @click="openAddModal"
          >
            <i class="fas fa-plus"></i>
            <span>Add New Vehicle</span>
          </button>
        </section>

        <!-- Loading -->
        <div v-if="loading" class="loading-container">
          <div class="loading-card">
            <div class="spinner-border text-warning"></div>
            <h5>Loading inventory</h5>
            <p>Please wait while your vehicles are being loaded...</p>
          </div>
        </div>

        <div v-else>

          <!-- Stats -->
          <section class="stats-grid">

            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-car"></i>
              </div>

              <div class="stat-content">
                <span class="stat-label">TOTAL VEHICLES</span>
                <h3>{{ products.length }}</h3>
                <p>Vehicles currently in inventory</p>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon money">
                <i class="fas fa-dollar-sign"></i>
              </div>

              <div class="stat-content">
                <span class="stat-label">INVENTORY VALUE</span>
                <h3>KSh {{ totalValue }}</h3>
                <p>Total selling value of inventory</p>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon tags">
                <i class="fas fa-tags"></i>
              </div>

              <div class="stat-content">
                <span class="stat-label">BADGED VEHICLES</span>
                <h3>{{ products.filter(p => p.badge).length }}</h3>
                <p>Vehicles with promotional tags</p>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon images">
                <i class="fas fa-image"></i>
              </div>

              <div class="stat-content">
                <span class="stat-label">WITH IMAGES</span>
                <h3>{{ products.filter(p => p.image).length }}</h3>
                <p>Vehicles with a main image</p>
              </div>
            </div>

          </section>

          <!-- Inventory Table -->
          <section class="inventory-card">

            <div class="table-header">
              <div>
                <span class="table-eyebrow">VEHICLE DATABASE</span>
                <h2>All Vehicles</h2>
                <p>
                  {{ products.length }}
                  {{ products.length === 1 ? 'vehicle' : 'vehicles' }}
                  available in your inventory
                </p>
              </div>

              <div class="vehicle-count">
                <i class="fas fa-car"></i>
                {{ products.length }}
              </div>
            </div>

            <div class="table-wrapper">
              <table class="product-table">

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>IMAGE</th>
                    <th>VEHICLE</th>
                    <th>MODEL</th>
                    <th>YEAR</th>
                    <th>CONDITION</th>
                    <th>FUEL</th>
                    <th>BUYING</th>
                    <th>SELLING</th>
                    <th>BADGE</th>
                    <th>CATEGORY</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>

                <tbody>

                  <tr
                    v-for="prod in products"
                    :key="prod.id"
                  >
                    <td>
                      <span class="id-badge">
                        #{{ prod.id }}
                      </span>
                    </td>

                    <td>
                      <div class="image-cell">

                        <img
                          v-if="prod.image"
                          :src="prod.image"
                          alt="Vehicle"
                          class="product-img"
                        />

                        <div v-else class="no-image">
                          <i class="fas fa-car"></i>
                        </div>

                      </div>
                    </td>

                    <td>
                      <div class="vehicle-name">
                        <strong>{{ prod.name }}</strong>
                        <small v-if="prod.subtitle">
                          {{ prod.subtitle }}
                        </small>
                      </div>
                    </td>

                    <td>
                      <span class="model-text">
                        {{ prod.model || '—' }}
                      </span>
                    </td>

                    <td>
                      <span class="year-badge">
                        {{ prod.year }}
                      </span>
                    </td>

                    <td>
                      <span class="condition-badge">
                        {{ prod.condition }}
                      </span>
                    </td>

                    <td>
                      <div class="fuel-cell">
                        <i
                          class="fas"
                          :class="
                            prod.fuel === 'Electric'
                              ? 'fa-bolt'
                              : prod.fuel === 'Diesel'
                              ? 'fa-gas-pump'
                              : 'fa-car-side'
                          "
                        ></i>

                        {{ prod.fuel }}
                      </div>
                    </td>

                    <td>
                      <span class="price buying-price">
                        KSh {{ formatNumber(prod.buying_price) }}
                      </span>
                    </td>

                    <td>
                      <span class="price selling-price">
                        KSh {{ formatNumber(prod.selling_price) }}
                      </span>
                    </td>

                    <td>
                      <span
                        v-if="prod.badge"
                        class="badge-custom"
                        :style="badgeStyle(prod.badge)"
                      >
                        {{ prod.badge }}
                      </span>

                      <span v-else class="empty-value">
                        —
                      </span>
                    </td>

                    <td>
                      <span
                        v-if="prod.category"
                        class="category-badge"
                      >
                        {{ prod.category }}
                      </span>

                      <span v-else class="empty-value">
                        —
                      </span>
                    </td>

                    <td>
                      <div class="actions">

                        <button
                          class="btn-icon edit"
                          @click="openEditModal(prod.id)"
                          title="Edit vehicle"
                        >
                          <i class="fas fa-pencil-alt"></i>
                        </button>

                        <button
                          class="btn-icon delete"
                          @click="deleteProduct(prod.id)"
                          title="Delete vehicle"
                        >
                          <i class="fas fa-trash"></i>
                        </button>

                      </div>
                    </td>
                  </tr>

                  <!-- Empty State -->
                  <tr v-if="products.length === 0">
                    <td colspan="12">
                      <div class="empty-state">
                        <div class="empty-icon">
                          <i class="fas fa-car"></i>
                        </div>

                        <h3>No vehicles found</h3>

                        <p>
                          Your inventory is currently empty.
                          Add your first vehicle to get started.
                        </p>

                        <button
                          class="btn-add empty-btn"
                          @click="openAddModal"
                        >
                          <i class="fas fa-plus"></i>
                          Add New Vehicle
                        </button>
                      </div>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

          </section>

        </div>
      </div>

      <!-- ADD / EDIT VEHICLE MODAL -->
      <div
        class="modal fade"
        id="productModal"
        tabindex="-1"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-xl modal-dialog-centered">
          <div class="modal-content">

            <!-- Modal Header -->
            <div class="modal-header">

              <div class="modal-heading">
                <div class="modal-icon">
                  <i class="fas fa-car"></i>
                </div>

                <div>
                  <h1
                    class="modal-title"
                    id="modalTitle"
                  >
                    <i class="fas fa-plus-circle"></i>
                    Add New Vehicle
                  </h1>

                  <p>
                    Add complete vehicle information to your inventory
                  </p>
                </div>
              </div>

              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>

            </div>

            <!-- Modal Body -->
            <div class="modal-body">

              <form
                id="productForm"
                @submit.prevent="saveProduct"
              >

                <!-- BASIC INFORMATION -->
                <div class="form-section-title">
                  <div class="section-icon">
                    <i class="fas fa-info-circle"></i>
                  </div>

                  <div>
                    <h3>Basic Information</h3>
                    <p>General details about the vehicle</p>
                  </div>
                </div>

                <div class="form-grid form-grid-2">

                  <div class="form-group">
                    <label class="form-label">
                      Vehicle Name
                      <span class="text-danger">*</span>
                    </label>

                    <input
                      type="text"
                      ref="prodName"
                      class="form-control-custom"
                      placeholder="e.g. Lamborghini Aventador"
                      required
                    />
                  </div>

                  <div class="form-group">
                    <label class="form-label">
                      Model
                      <span class="text-danger">*</span>
                    </label>

                    <input
                      type="text"
                      ref="prodModel"
                      class="form-control-custom"
                      placeholder="e.g. Aventador SVJ"
                      required
                    />
                  </div>

                </div>

                <div class="form-grid form-grid-3">

                  <div class="form-group">
                    <label class="form-label">
                      Year
                      <span class="text-danger">*</span>
                    </label>

                    <input
                      type="number"
                      ref="prodYear"
                      class="form-control-custom"
                      placeholder="e.g. 2025"
                      required
                    />
                  </div>

                  <div class="form-group">
                    <label class="form-label">
                      Condition
                      <span class="text-danger">*</span>
                    </label>

                    <select
                      ref="prodCondition"
                      class="form-select-custom"
                      required
                    >
                      <option value="">Select condition</option>
                      <option>New</option>
                      <option>Used</option>
                      <option>Refurbished</option>
                      <option>Pre-owned</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label class="form-label">
                      Fuel Type
                      <span class="text-danger">*</span>
                    </label>

                    <select
                      ref="prodFuel"
                      class="form-select-custom"
                      required
                    >
                      <option value="">Select fuel</option>
                      <option>Petrol</option>
                      <option>Diesel</option>
                      <option>Electric</option>
                      <option>Hybrid</option>
                      <option>Plug-in Hybrid</option>
                    </select>
                  </div>

                </div>

                <!-- PRICING -->
                <div class="form-section-title">
                  <div class="section-icon">
                    <i class="fas fa-money-bill-wave"></i>
                  </div>

                  <div>
                    <h3>Pricing</h3>
                    <p>Set the buying and selling prices</p>
                  </div>
                </div>

                <div class="form-grid form-grid-2">

                  <div class="form-group">
                    <label class="form-label">
                      Buying Price (KSh)
                      <span class="text-danger">*</span>
                    </label>

                    <div class="input-with-icon">
                      <i class="fas fa-coins"></i>

                      <input
                        type="number"
                        ref="prodBuying"
                        class="form-control-custom"
                        placeholder="e.g. 25000000"
                        required
                      />
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">
                      Selling Price (KSh)
                      <span class="text-danger">*</span>
                    </label>

                    <div class="input-with-icon">
                      <i class="fas fa-tag"></i>

                      <input
                        type="number"
                        ref="prodSelling"
                        class="form-control-custom"
                        placeholder="e.g. 35000000"
                        required
                      />
                    </div>
                  </div>

                </div>

                <!-- CLASSIFICATION -->
                <div class="form-section-title">
                  <div class="section-icon">
                    <i class="fas fa-tags"></i>
                  </div>

                  <div>
                    <h3>Classification</h3>
                    <p>Organize and categorize your vehicle</p>
                  </div>
                </div>

                <div class="form-grid form-grid-2">

                  <div class="form-group">
                    <label class="form-label">
                      Badge / Tag
                    </label>

                    <select
                      ref="prodBadge"
                      class="form-select-custom"
                    >
                      <option value="">None</option>
                      <option value="Featured">Featured</option>
                      <option value="New">New</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Luxury">Luxury</option>
                      <option value="Electric">Electric</option>
                      <option value="Hypercar">Hypercar</option>
                      <option value="Muscle">Muscle</option>
                      <option value="Performance">Performance</option>
                      <option value="Supercar">Supercar</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label class="form-label">
                      Category
                    </label>

                    <select
                      ref="prodCategory"
                      class="form-select-custom"
                    >
                      <option value="">None</option>
                      <option value="luxury">Luxury</option>
                      <option value="sports">Sports</option>
                      <option value="electric">Electric</option>
                      <option value="hypercar">Hypercar</option>
                      <option value="muscle">Muscle</option>
                      <option value="performance">Performance</option>
                      <option value="supercar">Supercar</option>
                      <option value="suv">SUV</option>
                    </select>
                  </div>

                </div>

                <!-- IMAGES -->
                <div class="form-section-title">
                  <div class="section-icon">
                    <i class="fas fa-images"></i>
                  </div>

                  <div>
                    <h3>Vehicle Images</h3>
                    <p>Add the main and hero images for this vehicle</p>
                  </div>
                </div>

                <div class="upload-box">

                  <div class="upload-icon">
                    <i class="fas fa-cloud-upload-alt"></i>
                  </div>

                  <div class="upload-content">
                    <label class="form-label">
                      Upload Images
                    </label>

                    <p>
                      Select up to two images. The first image becomes
                      the main thumbnail and the second becomes the hero image.
                    </p>

                    <input
                      type="file"
                      ref="prodImageFile"
                      class="form-control-custom file-input"
                      accept="image/*"
                      multiple
                      @change="handleImageFiles"
                    />
                  </div>

                </div>

                <!-- Image Preview -->
                <div
                  class="image-preview-container"
                  id="imagePreviewContainer"
                >
                  <div
                    class="image-preview-row"
                    id="imagePreviewRow"
                  ></div>
                </div>

                <!-- Hidden fallback inputs -->
                <div class="hidden-inputs">
                  <input
                    type="text"
                    ref="prodImage"
                  />

                  <input
                    type="text"
                    ref="prodHero"
                  />
                </div>

                <!-- SPECIFICATIONS -->
                <div class="form-section-title">
                  <div class="section-icon">
                    <i class="fas fa-cogs"></i>
                  </div>

                  <div>
                    <h3>Specifications</h3>
                    <p>Technical details and performance information</p>
                  </div>
                </div>

                <div class="form-grid form-grid-4">

                  <div class="form-group">
                    <label class="form-label">Engine</label>

                    <input
                      type="text"
                      ref="prodEngine"
                      class="form-control-custom"
                      placeholder="e.g. V12"
                    />
                  </div>

                  <div class="form-group">
                    <label class="form-label">Horsepower</label>

                    <input
                      type="text"
                      ref="prodHp"
                      class="form-control-custom"
                      placeholder="e.g. 759 hp"
                    />
                  </div>

                  <div class="form-group">
                    <label class="form-label">Top Speed</label>

                    <input
                      type="text"
                      ref="prodTopSpeed"
                      class="form-control-custom"
                      placeholder="e.g. 220 mph"
                    />
                  </div>

                  <div class="form-group">
                    <label class="form-label">0-60 mph</label>

                    <input
                      type="text"
                      ref="prodZeroSixty"
                      class="form-control-custom"
                      placeholder="e.g. 2.8s"
                    />
                  </div>

                </div>

                <div class="form-grid form-grid-2">

                  <div class="form-group">
                    <label class="form-label">
                      Transmission
                    </label>

                    <input
                      type="text"
                      ref="prodTrans"
                      class="form-control-custom"
                      placeholder="e.g. 7-Speed"
                    />
                  </div>

                  <div class="form-group">
                    <label class="form-label">
                      Drivetrain
                    </label>

                    <input
                      type="text"
                      ref="prodDrivetrain"
                      class="form-control-custom"
                      placeholder="e.g. AWD"
                    />
                  </div>

                </div>

                <!-- DESCRIPTION -->
                <div class="form-section-title">
                  <div class="section-icon">
                    <i class="fas fa-file-alt"></i>
                  </div>

                  <div>
                    <h3>Description & Features</h3>
                    <p>Tell customers more about this vehicle</p>
                  </div>
                </div>

                <div class="form-grid form-grid-2">

                  <div class="form-group">
                    <label class="form-label">
                      Subtitle
                    </label>

                    <input
                      type="text"
                      ref="prodSubtitle"
                      class="form-control-custom"
                      placeholder="e.g. V12 · 759 hp"
                    />
                  </div>

                  <div class="form-group">
                    <label class="form-label">
                      Features
                    </label>

                    <input
                      type="text"
                      ref="prodFeatures"
                      class="form-control-custom"
                      placeholder="e.g. Full Service History, 12-Month Warranty"
                    />
                  </div>

                </div>

                <div class="form-group full-width">
                  <label class="form-label">
                    Description
                  </label>

                  <textarea
                    ref="prodDescription"
                    class="form-control-custom textarea-custom"
                    rows="5"
                    placeholder="Write a detailed description of the vehicle..."
                  ></textarea>
                </div>

              </form>
            </div>

            <!-- Modal Footer -->
            <div class="modal-footer">

              <button
                type="button"
                class="btn-modal-cancel"
                data-bs-dismiss="modal"
              >
                <i class="fas fa-times"></i>
                Cancel
              </button>

              <button
                type="button"
                class="btn-modal-submit"
                id="saveProductBtn"
                @click="saveProduct"
              >
                <i class="fas fa-save"></i>
                <span id="saveBtnText">Add Vehicle</span>
              </button>

            </div>

          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script>
import axios from "axios";
import { API_BASE_URL } from "@/utils/config";
import { Modal } from "bootstrap";

export default {
  name: "ProductsPage",

  data() {
    return {
      sidebarOpen: false,
      products: [],
      loading: true,
      editingId: null,
      modalInstance: null,
      selectedImages: [],
    };
  },

  computed: {
    totalValue() {
      let total = 0;

      for (let i = 0; i < this.products.length; i++) {
        total += Number(this.products[i].selling_price) || 0;
      }

      return total.toLocaleString();
    },
  },

  methods: {
    formatNumber(num) {
      return num
        ? Number(num).toLocaleString()
        : "0";
    },

    badgeStyle(badge) {
      const colors = {
        Featured: "background:#ffc107;color:#000;",
        New: "background:#28a745;color:#fff;",
        Hybrid: "background:#17a2b8;color:#fff;",
        Luxury: "background:#6c757d;color:#fff;",
        Electric: "background:#007bff;color:#fff;",
        Hypercar: "background:#dc3545;color:#fff;",
        Muscle: "background:#fd7e14;color:#fff;",
        Performance: "background:#6f42c1;color:#fff;",
        Supercar: "background:#e83e8c;color:#fff;",
      };

      return (
        colors[badge] ||
        "background:#6c757d;color:#fff;"
      );
    },

    async getProducts() {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/products`,
          {
            withCredentials: true,
          }
        );

        this.products = response.data;
      } catch (error) {
        console.error(
          "Error fetching products:",
          error
        );

        if (error.response?.status === 401) {
          this.$router.push("/login");
        }
      } finally {
        this.loading = false;
      }
    },

    async handleLogout() {
      try {
        await axios.post(
          `${API_BASE_URL}/logout`,
          {},
          {
            withCredentials: true,
          }
        );
      } catch (error) {
        console.error(
          "Logout error:",
          error
        );
      }

      this.$router.push("/login");
    },

    openAddModal() {
      this.editingId = null;

      document.getElementById(
        "modalTitle"
      ).innerHTML =
        '<i class="fas fa-plus-circle"></i> Add New Vehicle';

      document.getElementById(
        "saveBtnText"
      ).innerText = "Add Vehicle";

      this.resetForm();

      this.modalInstance = new Modal(
        document.getElementById("productModal")
      );

      this.modalInstance.show();
    },

    openEditModal(id) {
      const product = this.products.find(
        (p) => p.id === id
      );

      if (!product) return;

      this.editingId = id;

      document.getElementById(
        "modalTitle"
      ).innerHTML =
        '<i class="fas fa-edit"></i> Edit Vehicle';

      document.getElementById(
        "saveBtnText"
      ).innerText = "Update Vehicle";

      this.$refs.prodName.value =
        product.name || "";

      this.$refs.prodModel.value =
        product.model || "";

      this.$refs.prodYear.value =
        product.year || "";

      this.$refs.prodCondition.value =
        product.condition || "";

      this.$refs.prodFuel.value =
        product.fuel || "";

      this.$refs.prodBuying.value =
        product.buying_price || "";

      this.$refs.prodSelling.value =
        product.selling_price || "";

      this.$refs.prodBadge.value =
        product.badge || "";

      this.$refs.prodCategory.value =
        product.category || "";

      this.$refs.prodImage.value =
        product.image || "";

      this.$refs.prodHero.value =
        product.hero_image || "";

      this.showExistingImagePreview(
        product.image,
        product.hero_image
      );

      this.$refs.prodEngine.value =
        product.engine || "";

      this.$refs.prodHp.value =
        product.horsepower || "";

      this.$refs.prodTopSpeed.value =
        product.top_speed || "";

      this.$refs.prodZeroSixty.value =
        product.zero_to_sixty || "";

      this.$refs.prodTrans.value =
        product.transmission || "";

      this.$refs.prodDrivetrain.value =
        product.drivetrain || "";

      this.$refs.prodSubtitle.value =
        product.subtitle || "";

      this.$refs.prodDescription.value =
        product.description || "";

      this.$refs.prodFeatures.value =
        product.features
          ? product.features.join(", ")
          : "";

      this.modalInstance = new Modal(
        document.getElementById("productModal")
      );

      this.modalInstance.show();
    },

    showExistingImagePreview(
      imageUrl,
      heroUrl
    ) {
      const previewRow =
        document.getElementById(
          "imagePreviewRow"
        );

      previewRow.innerHTML = "";

      if (imageUrl) {
        this.addPreview(
          imageUrl,
          "Main"
        );
      }

      if (heroUrl) {
        this.addPreview(
          heroUrl,
          "Hero"
        );
      }
    },

    addPreview(src, label) {
      const previewRow =
        document.getElementById(
          "imagePreviewRow"
        );

      const wrapper =
        document.createElement("div");

      wrapper.className =
        "preview-item";

      wrapper.innerHTML = `
        <div class="preview-image-wrapper">
          <img
            src="${src}"
            alt="${label} vehicle image"
          />

          <span class="preview-label">
            ${label}
          </span>
        </div>
      `;

      previewRow.appendChild(
        wrapper
      );
    },

    handleImageFiles(event) {
      const files =
        event.target.files;

      const previewRow =
        document.getElementById(
          "imagePreviewRow"
        );

      previewRow.innerHTML = "";

      const fileArray =
        Array.from(files).slice(0, 2);

      fileArray.forEach(
        (file, index) => {
          const reader =
            new FileReader();

          reader.onload = (e) => {
            const dataUrl =
              e.target.result;

            if (index === 0) {
              this.$refs.prodImage.value =
                dataUrl;
            } else if (index === 1) {
              this.$refs.prodHero.value =
                dataUrl;
            }

            const label =
              index === 0
                ? "Main"
                : "Hero";

            this.addPreview(
              dataUrl,
              label
            );
          };

          reader.readAsDataURL(file);
        }
      );
    },

    resetForm() {
      const refs =
        this.$refs;

      refs.prodName.value = "";
      refs.prodModel.value = "";
      refs.prodYear.value = "";
      refs.prodCondition.value = "";
      refs.prodFuel.value = "";
      refs.prodBuying.value = "";
      refs.prodSelling.value = "";
      refs.prodBadge.value = "";
      refs.prodCategory.value = "";
      refs.prodImage.value = "";
      refs.prodHero.value = "";
      refs.prodEngine.value = "";
      refs.prodHp.value = "";
      refs.prodTopSpeed.value = "";
      refs.prodZeroSixty.value = "";
      refs.prodTrans.value = "";
      refs.prodDrivetrain.value = "";
      refs.prodSubtitle.value = "";
      refs.prodDescription.value = "";
      refs.prodFeatures.value = "";
      refs.prodImageFile.value = "";

      document.getElementById(
        "imagePreviewRow"
      ).innerHTML = "";
    },

    async saveProduct() {
      const data = {
        name:
          this.$refs.prodName.value.trim(),

        model:
          this.$refs.prodModel.value.trim(),

        year:
          parseInt(
            this.$refs.prodYear.value
          ) || 0,

        condition:
          this.$refs.prodCondition.value,

        fuel:
          this.$refs.prodFuel.value,

        buying_price:
          parseFloat(
            this.$refs.prodBuying.value
          ) || 0,

        selling_price:
          parseFloat(
            this.$refs.prodSelling.value
          ) || 0,

        badge:
          this.$refs.prodBadge.value ||
          null,

        category:
          this.$refs.prodCategory.value ||
          null,

        image:
          this.$refs.prodImage.value.trim() ||
          null,

        hero_image:
          this.$refs.prodHero.value.trim() ||
          null,

        engine:
          this.$refs.prodEngine.value.trim() ||
          null,

        horsepower:
          this.$refs.prodHp.value.trim() ||
          null,

        top_speed:
          this.$refs.prodTopSpeed.value.trim() ||
          null,

        zero_to_sixty:
          this.$refs.prodZeroSixty.value.trim() ||
          null,

        transmission:
          this.$refs.prodTrans.value.trim() ||
          null,

        drivetrain:
          this.$refs.prodDrivetrain.value.trim() ||
          null,

        subtitle:
          this.$refs.prodSubtitle.value.trim() ||
          null,

        description:
          this.$refs.prodDescription.value.trim() ||
          null,

        features:
          this.$refs.prodFeatures.value.trim()
            ? this.$refs.prodFeatures.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : null,
      };

      if (
        !data.name ||
        !data.model ||
        !data.year ||
        !data.condition ||
        !data.fuel ||
        !data.buying_price ||
        !data.selling_price
      ) {
        alert(
          "Please fill in all required fields (*)"
        );

        return;
      }

      try {
        if (this.editingId) {
          await axios.put(
            `${API_BASE_URL}/products/${this.editingId}`,
            data,
            {
              withCredentials: true,
            }
          );

          alert(
            "✅ Vehicle updated successfully!"
          );
        } else {
          await axios.post(
            `${API_BASE_URL}/products`,
            data,
            {
              withCredentials: true,
            }
          );

          alert(
            "✅ Vehicle added successfully!"
          );
        }

        this.modalInstance?.hide();

        this.resetForm();

        this.editingId = null;

        await this.getProducts();
      } catch (error) {
        alert(
          "❌ Failed to save vehicle:\n" +
            (error.response?.data?.detail ||
              error.message)
        );
      }
    },

    async deleteProduct(id) {
      if (
        !confirm(
          "Are you sure you want to delete this vehicle?"
        )
      ) {
        return;
      }

      try {
        await axios.delete(
          `${API_BASE_URL}/products/${id}`,
          {
            withCredentials: true,
          }
        );

        alert(
          "✅ Vehicle deleted successfully!"
        );

        await this.getProducts();
      } catch (error) {
        alert(
          "❌ Failed to delete vehicle:\n" +
            (error.response?.data?.detail ||
              error.message)
        );
      }
    },
  },

  mounted() {
    this.getProducts();

    document
      .getElementById("productModal")
      ?.addEventListener(
        "hidden.bs.modal",
        () => {
          document
            .querySelectorAll(
              ".modal-backdrop"
            )
            .forEach((el) =>
              el.remove()
            );
        }
      );
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.inventory-page {
  min-height: 100vh;
  background: #f5f6fa;
  color: #1a1a2e;
}

/* =========================
   MAIN CONTENT
========================= */

.main-content {
  min-height: 100vh;
  padding-top: 105px;
  padding-bottom: 80px;
}

.inventory-container {
  width: min(1450px, calc(100% - 70px));
  margin: 0 auto;
}

/* =========================
   SIDEBAR
========================= */

.sidebar {
  position: fixed;
  left: -290px;
  top: 0;
  bottom: 0;
  width: 290px;
  background:
    radial-gradient(
      circle at top right,
      rgba(255, 193, 7, 0.08),
      transparent 30%
    ),
    linear-gradient(
      180deg,
      #11111f 0%,
      #17172b 55%,
      #11111f 100%
    );
  transition: left 0.3s ease;
  z-index: 1001;
  padding-top: 80px;
  box-shadow: 8px 0 35px rgba(0, 0, 0, 0.2);
}

.sidebar.show {
  left: 0;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 25px 22px;
  margin-bottom: 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.brand-icon {
  width: 44px;
  height: 44px;
  border-radius: 13px;
  background: #ffc107;
  color: #11111f;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 19px;
  box-shadow: 0 8px 20px rgba(255, 193, 7, 0.15);
}

.sidebar-header h4 {
  margin: 0;
  color: #ffc107;
  font-size: 22px;
  font-weight: 800;
}

.sidebar-header p {
  margin: 3px 0 0;
  color: rgba(255, 255, 255, 0.48);
  font-size: 11px;
}

.sidebar-nav {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar .nav-item {
  margin: 6px 12px;
}

.sidebar .nav-link {
  color: rgba(255, 255, 255, 0.78);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 13px 15px;
  border-radius: 11px;
  transition: all 0.25s ease;
  font-weight: 500;
  font-size: 14px;
}

.sidebar .nav-link i {
  width: 22px;
  text-align: center;
  font-size: 16px;
}

.sidebar .nav-link:hover {
  background: rgba(255, 193, 7, 0.1);
  color: #ffc107;
  transform: translateX(4px);
}

.sidebar .nav-link.router-link-active {
  background: #ffc107;
  color: #11111f;
  box-shadow: 0 8px 20px rgba(255, 193, 7, 0.15);
}

.sidebar .logout-btn {
  margin-top: 30px;
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.sidebar .logout-btn .nav-link {
  color: #ff7070;
}

.sidebar .logout-btn .nav-link:hover {
  background: rgba(255, 107, 107, 0.12);
  color: #ff7070;
}

/* =========================
   SIDEBAR TOGGLE
========================= */

.sidebar-toggle {
  position: fixed;
  left: 22px;
  top: 88px;
  z-index: 1002;
  width: 46px;
  height: 46px;
  border: none;
  border-radius: 14px;
  background: #ffc107;
  color: #11111f;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.16);
  transition: all 0.25s ease;
}

.sidebar-toggle:hover {
  transform: translateY(-2px) scale(1.04);
  background: #ffca2c;
}

.sidebar-toggle i {
  font-size: 18px;
}

/* =========================
   OVERLAY
========================= */

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.52);
  backdrop-filter: blur(3px);
  z-index: 1000;
  display: none;
}

.overlay.show {
  display: block;
}

/* =========================
   PAGE HEADER
========================= */

.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 30px;
  margin-bottom: 35px;
}

.eyebrow,
.table-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #b18400;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.5px;
  margin-bottom: 9px;
}

.page-header h1 {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  color: #17172b;
  font-size: 34px;
  font-weight: 800;
  letter-spacing: -0.7px;
}

.page-header h1 i {
  color: #ffc107;
}

.page-header p {
  margin: 9px 0 0;
  color: #777b88;
  font-size: 14px;
}

/* =========================
   ADD BUTTON
========================= */

.btn-add {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  border: none;
  background: #ffc107;
  color: #11111f;
  padding: 13px 22px;
  border-radius: 13px;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;
  box-shadow: 0 8px 22px rgba(255, 193, 7, 0.18);
  transition: all 0.25s ease;
}

.btn-add:hover {
  background: #ffca2c;
  color: #11111f;
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(255, 193, 7, 0.25);
}

/* =========================
   LOADING
========================= */

.loading-container {
  padding: 50px 0;
}

.loading-card {
  background: white;
  border-radius: 20px;
  padding: 55px 20px;
  text-align: center;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.04);
}

.loading-card .spinner-border {
  width: 3rem;
  height: 3rem;
}

.loading-card h5 {
  margin: 20px 0 5px;
  font-weight: 700;
}

.loading-card p {
  margin: 0;
  color: #888;
  font-size: 14px;
}

/* =========================
   STATS
========================= */

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
  margin-bottom: 28px;
}

.stat-card {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 22px;
  background: white;
  border: 1px solid #eeeeF1;
  border-radius: 17px;
  box-shadow: 0 7px 25px rgba(0, 0, 0, 0.045);
  transition: all 0.25s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.08);
}

.stat-icon {
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 193, 7, 0.13);
  color: #d69e00;
  font-size: 21px;
}

.stat-icon.money {
  background: rgba(40, 167, 69, 0.1);
  color: #28a745;
}

.stat-icon.tags {
  background: rgba(111, 66, 193, 0.1);
  color: #6f42c1;
}

.stat-icon.images {
  background: rgba(0, 123, 255, 0.1);
  color: #007bff;
}

.stat-content {
  min-width: 0;
}

.stat-label {
  display: block;
  color: #9295a0;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1px;
  margin-bottom: 4px;
}

.stat-content h3 {
  margin: 0;
  color: #17172b;
  font-size: 22px;
  font-weight: 800;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stat-content p {
  margin: 3px 0 0;
  color: #999;
  font-size: 11px;
}

/* =========================
   INVENTORY CARD
========================= */

.inventory-card {
  background: white;
  border-radius: 20px;
  border: 1px solid #eeeeF1;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.045);
  overflow: hidden;
}

.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 25px 28px;
  border-bottom: 1px solid #eeeeF1;
}

.table-eyebrow {
  margin-bottom: 4px;
  color: #a67c00;
}

.table-header h2 {
  margin: 0;
  font-size: 21px;
  font-weight: 800;
  color: #17172b;
}

.table-header p {
  margin: 5px 0 0;
  color: #9295a0;
  font-size: 12px;
}

.vehicle-count {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;
  border-radius: 30px;
  background: #fff8df;
  color: #8c6800;
  font-size: 12px;
  font-weight: 800;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

/* =========================
   TABLE
========================= */

.product-table {
  width: 100%;
  min-width: 1250px;
  border-collapse: collapse;
  margin: 0;
}

.product-table th {
  padding: 15px 17px;
  background: #fafafa;
  color: #777b88;
  border-bottom: 1px solid #eeeeF1;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.8px;
  white-space: nowrap;
  text-align: left;
}

.product-table td {
  padding: 15px 17px;
  border-bottom: 1px solid #f1f1f3;
  color: #4d4f59;
  font-size: 12px;
  vertical-align: middle;
  white-space: nowrap;
}

.product-table tbody tr {
  transition: background 0.2s ease;
}

.product-table tbody tr:hover {
  background: #fffdf5;
}

.product-table tbody tr:last-child td {
  border-bottom: none;
}

/* =========================
   TABLE CELLS
========================= */

.id-badge {
  display: inline-flex;
  align-items: center;
  padding: 5px 8px;
  border-radius: 7px;
  background: #f2f3f6;
  color: #666975;
  font-size: 10px;
  font-weight: 700;
}

.image-cell {
  display: flex;
  align-items: center;
}

.product-img,
.no-image {
  width: 52px;
  height: 52px;
  border-radius: 11px;
}

.product-img {
  object-fit: cover;
  display: block;
}

.no-image {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  color: #aaa;
  font-size: 17px;
}

.vehicle-name {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.vehicle-name strong {
  color: #202131;
  font-size: 13px;
}

.vehicle-name small {
  color: #999;
  font-size: 10px;
  max-width: 170px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.model-text {
  color: #666975;
}

.year-badge {
  display: inline-flex;
  padding: 5px 8px;
  border-radius: 7px;
  background: #f5f5f7;
  color: #555866;
  font-weight: 700;
}

.condition-badge {
  display: inline-flex;
  padding: 5px 9px;
  border-radius: 20px;
  background: #edf8f0;
  color: #278442;
  font-size: 10px;
  font-weight: 700;
}

.fuel-cell {
  display: flex;
  align-items: center;
  gap: 7px;
}

.fuel-cell i {
  color: #d99f00;
}

.price {
  font-weight: 700;
}

.buying-price {
  color: #777b88;
}

.selling-price {
  color: #1d8a48;
}

.badge-custom {
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 30px;
  font-size: 9px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.category-badge {
  display: inline-flex;
  padding: 5px 9px;
  border-radius: 8px;
  background: #f2f3f7;
  color: #686b77;
  font-size: 10px;
  font-weight: 700;
  text-transform: capitalize;
}

.empty-value {
  color: #bbb;
}

/* =========================
   ACTION BUTTONS
========================= */

.actions {
  display: flex;
  align-items: center;
  gap: 7px;
}

.btn-icon {
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 9px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-icon.edit {
  background: #fff3c4;
  color: #9b7300;
}

.btn-icon.edit:hover {
  background: #ffc107;
  color: #111;
  transform: translateY(-2px);
}

.btn-icon.delete {
  background: #fff0f0;
  color: #dc3545;
}

.btn-icon.delete:hover {
  background: #dc3545;
  color: white;
  transform: translateY(-2px);
}

/* =========================
   EMPTY STATE
========================= */

.empty-state {
  padding: 70px 20px;
  text-align: center;
}

.empty-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 18px;
  border-radius: 20px;
  background: #fff8df;
  color: #d59f00;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 27px;
}

.empty-state h3 {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 800;
}

.empty-state p {
  max-width: 430px;
  margin: 0 auto 22px;
  color: #9295a0;
  font-size: 13px;
  line-height: 1.7;
}

.empty-btn {
  margin: 0 auto;
}

/* =========================
   MODAL
========================= */

.modal {
  z-index: 1105 !important;
}

.modal-backdrop.show {
  z-index: 1100 !important;
  background: rgba(0, 0, 0, 0.65) !important;
}

.modal-content {
  background: #17172b !important;
  color: white !important;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
}

.modal-header {
  padding: 22px 28px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-heading {
  display: flex;
  align-items: center;
  gap: 14px;
}

.modal-icon {
  width: 46px;
  height: 46px;
  border-radius: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffc107;
  color: #17172b;
  font-size: 18px;
}

.modal-title {
  margin: 0;
  color: white !important;
  font-size: 19px;
  font-weight: 800;
}

.modal-title i {
  color: #ffc107;
  margin-right: 6px;
}

.modal-heading p {
  margin: 4px 0 0;
  color: rgba(255, 255, 255, 0.46);
  font-size: 11px;
}

.modal-body {
  padding: 28px;
  max-height: 73vh;
  overflow-y: auto;
}

.modal-body::-webkit-scrollbar {
  width: 7px;
}

.modal-body::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.03);
}

.modal-body::-webkit-scrollbar-thumb {
  background: rgba(255, 193, 7, 0.35);
  border-radius: 20px;
}

/* =========================
   FORM SECTIONS
========================= */

.form-section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  margin-bottom: 20px;
  padding-bottom: 13px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.section-icon {
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  border-radius: 9px;
  background: rgba(255, 193, 7, 0.11);
  color: #ffc107;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.form-section-title h3 {
  margin: 0;
  color: #ffc107;
  font-size: 14px;
  font-weight: 700;
}

.form-section-title p {
  margin: 2px 0 0;
  color: rgba(255, 255, 255, 0.4);
  font-size: 10px;
}

/* =========================
   FORM GRID
========================= */

.form-grid {
  display: grid;
  gap: 17px;
  margin-bottom: 17px;
}

.form-grid-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.form-grid-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.form-grid-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.form-group {
  min-width: 0;
}

.full-width {
  margin-bottom: 18px;
}

.form-label {
  display: block;
  margin-bottom: 7px;
  color: rgba(255, 255, 255, 0.84) !important;
  font-size: 11px;
  font-weight: 600;
}

.text-danger {
  color: #ff7373 !important;
}

/* =========================
   INPUTS
========================= */

.form-control-custom,
.form-select-custom {
  width: 100%;
  min-height: 44px;
  padding: 10px 13px;
  border: 1px solid rgba(255, 255, 255, 0.11);
  border-radius: 10px;
  outline: none;
  background: rgba(255, 255, 255, 0.055) !important;
  color: white !important;
  font-size: 12px;
  transition: all 0.25s ease;
}

.form-control-custom:focus,
.form-select-custom:focus {
  border-color: #ffc107 !important;
  background: rgba(255, 255, 255, 0.085) !important;
  box-shadow: 0 0 0 3px rgba(255, 193, 7, 0.08);
}

.form-control-custom::placeholder {
  color: rgba(255, 255, 255, 0.3) !important;
}

.form-select-custom option {
  background: #17172b;
  color: white;
}

.textarea-custom {
  resize: vertical;
  min-height: 120px;
  line-height: 1.6;
}

.input-with-icon {
  position: relative;
}

.input-with-icon i {
  position: absolute;
  left: 13px;
  top: 50%;
  transform: translateY(-50%);
  color: #ffc107;
  font-size: 12px;
  z-index: 2;
}

.input-with-icon input {
  padding-left: 36px;
}

/* =========================
   IMAGE UPLOAD
========================= */

.upload-box {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 18px;
  margin-bottom: 18px;
  border: 1px dashed rgba(255, 193, 7, 0.3);
  border-radius: 14px;
  background: rgba(255, 193, 7, 0.035);
}

.upload-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 193, 7, 0.11);
  color: #ffc107;
  font-size: 19px;
}

.upload-content {
  flex: 1;
  min-width: 0;
}

.upload-content .form-label {
  margin-bottom: 3px;
}

.upload-content p {
  margin: 0 0 10px;
  color: rgba(255, 255, 255, 0.42);
  font-size: 10px;
  line-height: 1.5;
}

.file-input {
  min-height: 42px;
}

.image-preview-container {
  margin-bottom: 20px;
}

.image-preview-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.preview-item {
  width: 105px;
}

.preview-image-wrapper {
  position: relative;
  width: 105px;
  height: 75px;
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.preview-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-label {
  position: absolute;
  right: 5px;
  top: 5px;
  padding: 3px 7px;
  border-radius: 5px;
  background: #ffc107;
  color: #111;
  font-size: 8px;
  font-weight: 800;
}

.hidden-inputs {
  display: none;
}

/* =========================
   MODAL FOOTER
========================= */

.modal-footer {
  padding: 17px 28px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-modal-submit,
.btn-modal-cancel {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 11px 21px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s ease;
}

.btn-modal-submit {
  border: none;
  background: #ffc107;
  color: #11111f;
}

.btn-modal-submit:hover {
  background: #ffca2c;
  transform: translateY(-1px);
}

.btn-modal-cancel {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.7);
}

.btn-modal-cancel:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.btn-close {
  filter: invert(1);
  opacity: 0.55;
}

.btn-close:hover {
  opacity: 1;
}

/* =========================
   RESPONSIVE
========================= */

@media (max-width: 1200px) {
  .inventory-container {
    width: min(100% - 50px, 1200px);
  }

  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .form-grid-4 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 991px) {
  .main-content {
    padding-top: 95px;
  }

  .page-header {
    align-items: flex-start;
  }

  .page-header h1 {
    font-size: 29px;
  }

  .form-grid-3 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .modal-dialog {
    margin: 15px;
  }

  .modal-body {
    max-height: 78vh;
  }
}

@media (max-width: 768px) {
  .inventory-container {
    width: calc(100% - 30px);
  }

  .sidebar-toggle {
    top: 72px;
    left: 15px;
    width: 42px;
    height: 42px;
  }

  .main-content {
    padding-top: 82px;
  }

  .page-header {
    flex-direction: column;
    align-items: stretch;
    gap: 20px;
    margin-bottom: 25px;
  }

  .page-header h1 {
    font-size: 26px;
  }

  .btn-add {
    width: 100%;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 13px;
  }

  .stat-card {
    padding: 18px;
  }

  .table-header {
    padding: 20px;
  }

  .modal-header {
    padding: 18px;
  }

  .modal-body {
    padding: 20px;
  }

  .modal-footer {
    padding: 15px 20px;
  }

  .form-grid-2,
  .form-grid-3,
  .form-grid-4 {
    grid-template-columns: 1fr;
  }

  .upload-box {
    align-items: flex-start;
  }
}

@media (max-width: 576px) {
  .inventory-container {
    width: calc(100% - 20px);
  }

  .eyebrow {
    font-size: 9px;
  }

  .page-header h1 {
    font-size: 23px;
  }

  .page-header p {
    font-size: 12px;
    line-height: 1.6;
  }

  .stat-card {
    gap: 12px;
  }

  .stat-icon {
    width: 45px;
    height: 45px;
    font-size: 18px;
  }

  .stat-content h3 {
    font-size: 19px;
  }

  .stat-content p {
    font-size: 10px;
  }

  .table-header {
    align-items: flex-start;
  }

  .table-header h2 {
    font-size: 18px;
  }

  .vehicle-count {
    display: none;
  }

  .modal-dialog {
    margin: 8px;
  }

  .modal-content {
    border-radius: 17px;
  }

  .modal-heading {
    gap: 10px;
  }

  .modal-icon {
    width: 40px;
    height: 40px;
  }

  .modal-title {
    font-size: 15px;
  }

  .modal-heading p {
    font-size: 9px;
  }

  .form-section-title {
    margin-top: 8px;
  }

  .upload-box {
    flex-direction: column;
  }

  .modal-footer {
    flex-direction: column-reverse;
  }

  .btn-modal-submit,
  .btn-modal-cancel {
    width: 100%;
  }
}

@media (max-width: 360px) {
  .page-header h1 {
    font-size: 21px;
  }

  .stat-card {
    padding: 15px;
  }

  .inventory-card {
    border-radius: 15px;
  }

  .modal-body {
    padding: 15px;
  }
}
</style>

<!-- 1145 lines -->