<template>
  <div class="inventory-page">
    <AdminNavbar />

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
              Manage your vehicle stock, pricing, specifications and images from
              one place.
            </p>
          </div>

          <button type="button" class="btn-add" @click="openAddModal">
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
                <h3>{{ products.filter((p) => p.badge).length }}</h3>
                <p>Vehicles with promotional tags</p>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon images">
                <i class="fas fa-image"></i>
              </div>

              <div class="stat-content">
                <span class="stat-label">WITH IMAGES</span>
                <h3>{{ products.filter((p) => p.image).length }}</h3>
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
                  {{ products.length === 1 ? "vehicle" : "vehicles" }}
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
                  <tr v-for="prod in products" :key="prod.id">
                    <td>
                      <span class="id-badge"> #{{ prod.id }} </span>
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
                        {{ prod.model || "—" }}
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

                      <span v-else class="empty-value"> — </span>
                    </td>

                    <td>
                      <span v-if="prod.category" class="category-badge">
                        {{ prod.category }}
                      </span>

                      <span v-else class="empty-value"> — </span>
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
                          Your inventory is currently empty. Add your first
                          vehicle to get started.
                        </p>

                        <button class="btn-add empty-btn" @click="openAddModal">
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
                  <h1 class="modal-title" id="modalTitle">
                    <i class="fas fa-plus-circle"></i>
                    Add New Vehicle
                  </h1>

                  <p>Add complete vehicle information to your inventory</p>
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
              <form id="productForm" @submit.prevent="saveProduct">
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

                    <select ref="prodFuel" class="form-select-custom" required>
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
                    <label class="form-label"> Badge / Tag </label>

                    <select ref="prodBadge" class="form-select-custom">
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
                    <label class="form-label"> Category </label>

                    <select ref="prodCategory" class="form-select-custom">
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
                    <label class="form-label"> Upload Images </label>

                    <p>
                      Select up to two images. The first image becomes the main
                      thumbnail and the second becomes the hero image.
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
                <div class="image-preview-container" id="imagePreviewContainer">
                  <div class="image-preview-row" id="imagePreviewRow"></div>
                </div>

                <!-- Hidden fallback inputs -->
                <div class="hidden-inputs">
                  <input type="text" ref="prodImage" />

                  <input type="text" ref="prodHero" />
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
                    <label class="form-label"> Transmission </label>

                    <input
                      type="text"
                      ref="prodTrans"
                      class="form-control-custom"
                      placeholder="e.g. 7-Speed"
                    />
                  </div>

                  <div class="form-group">
                    <label class="form-label"> Drivetrain </label>

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
                    <label class="form-label"> Subtitle </label>

                    <input
                      type="text"
                      ref="prodSubtitle"
                      class="form-control-custom"
                      placeholder="e.g. V12 · 759 hp"
                    />
                  </div>

                  <div class="form-group">
                    <label class="form-label"> Features </label>

                    <input
                      type="text"
                      ref="prodFeatures"
                      class="form-control-custom"
                      placeholder="e.g. Full Service History, 12-Month Warranty"
                    />
                  </div>
                </div>

                <div class="form-group full-width">
                  <label class="form-label"> Description </label>

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
import AdminNavbar from "@/components/AdminNavbar.vue";

export default {
  name: "ProductsPage",

  components: {
    AdminNavbar,
  },

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
      return num ? Number(num).toLocaleString() : "0";
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

      return colors[badge] || "background:#6c757d;color:#fff;";
    },

    async getProducts() {
      try {
        const response = await axios.get(`${API_BASE_URL}/products`, {
          withCredentials: true,
        });

        this.products = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);

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
          },
        );
      } catch (error) {
        console.error("Logout error:", error);
      }

      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
      this.$router.push("/login");
    },

    openAddModal() {
      this.editingId = null;

      document.getElementById("modalTitle").innerHTML =
        '<i class="fas fa-plus-circle"></i> Add New Vehicle';

      document.getElementById("saveBtnText").innerText = "Add Vehicle";

      this.resetForm();

      this.modalInstance = new Modal(document.getElementById("productModal"));

      this.modalInstance.show();
    },

    openEditModal(id) {
      const product = this.products.find((p) => p.id === id);

      if (!product) return;

      this.editingId = id;

      document.getElementById("modalTitle").innerHTML =
        '<i class="fas fa-edit"></i> Edit Vehicle';

      document.getElementById("saveBtnText").innerText = "Update Vehicle";

      this.$refs.prodName.value = product.name || "";

      this.$refs.prodModel.value = product.model || "";

      this.$refs.prodYear.value = product.year || "";

      this.$refs.prodCondition.value = product.condition || "";

      this.$refs.prodFuel.value = product.fuel || "";

      this.$refs.prodBuying.value = product.buying_price || "";

      this.$refs.prodSelling.value = product.selling_price || "";

      this.$refs.prodBadge.value = product.badge || "";

      this.$refs.prodCategory.value = product.category || "";

      this.$refs.prodImage.value = product.image || "";

      this.$refs.prodHero.value = product.hero_image || "";

      this.showExistingImagePreview(product.image, product.hero_image);

      this.$refs.prodEngine.value = product.engine || "";

      this.$refs.prodHp.value = product.horsepower || "";

      this.$refs.prodTopSpeed.value = product.top_speed || "";

      this.$refs.prodZeroSixty.value = product.zero_to_sixty || "";

      this.$refs.prodTrans.value = product.transmission || "";

      this.$refs.prodDrivetrain.value = product.drivetrain || "";

      this.$refs.prodSubtitle.value = product.subtitle || "";

      this.$refs.prodDescription.value = product.description || "";

      this.$refs.prodFeatures.value = product.features
        ? product.features.join(", ")
        : "";

      this.modalInstance = new Modal(document.getElementById("productModal"));

      this.modalInstance.show();
    },

    showExistingImagePreview(imageUrl, heroUrl) {
      const previewRow = document.getElementById("imagePreviewRow");

      previewRow.innerHTML = "";

      if (imageUrl) {
        this.addPreview(imageUrl, "Main");
      }

      if (heroUrl) {
        this.addPreview(heroUrl, "Hero");
      }
    },

    addPreview(src, label) {
      const previewRow = document.getElementById("imagePreviewRow");

      const wrapper = document.createElement("div");

      wrapper.className = "preview-item";

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

      previewRow.appendChild(wrapper);
    },

    handleImageFiles(event) {
      const files = event.target.files;

      const previewRow = document.getElementById("imagePreviewRow");

      previewRow.innerHTML = "";

      const fileArray = Array.from(files).slice(0, 2);

      fileArray.forEach((file, index) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          const dataUrl = e.target.result;

          if (index === 0) {
            this.$refs.prodImage.value = dataUrl;
          } else if (index === 1) {
            this.$refs.prodHero.value = dataUrl;
          }

          const label = index === 0 ? "Main" : "Hero";

          this.addPreview(dataUrl, label);
        };

        reader.readAsDataURL(file);
      });
    },

    resetForm() {
      const refs = this.$refs;

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

      document.getElementById("imagePreviewRow").innerHTML = "";
    },

    async saveProduct() {
      const data = {
        name: this.$refs.prodName.value.trim(),

        model: this.$refs.prodModel.value.trim(),

        year: parseInt(this.$refs.prodYear.value) || 0,

        condition: this.$refs.prodCondition.value,

        fuel: this.$refs.prodFuel.value,

        buying_price: parseFloat(this.$refs.prodBuying.value) || 0,

        selling_price: parseFloat(this.$refs.prodSelling.value) || 0,

        badge: this.$refs.prodBadge.value || null,

        category: this.$refs.prodCategory.value || null,

        image: this.$refs.prodImage.value.trim() || null,

        hero_image: this.$refs.prodHero.value.trim() || null,

        engine: this.$refs.prodEngine.value.trim() || null,

        horsepower: this.$refs.prodHp.value.trim() || null,

        top_speed: this.$refs.prodTopSpeed.value.trim() || null,

        zero_to_sixty: this.$refs.prodZeroSixty.value.trim() || null,

        transmission: this.$refs.prodTrans.value.trim() || null,

        drivetrain: this.$refs.prodDrivetrain.value.trim() || null,

        subtitle: this.$refs.prodSubtitle.value.trim() || null,

        description: this.$refs.prodDescription.value.trim() || null,

        features: this.$refs.prodFeatures.value.trim()
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
        alert("Please fill in all required fields (*)");

        return;
      }

      try {
        if (this.editingId) {
          await axios.put(`${API_BASE_URL}/products/${this.editingId}`, data, {
            withCredentials: true,
          });

          alert("Vehicle updated successfully.");
        } else {
          await axios.post(`${API_BASE_URL}/products`, data, {
            withCredentials: true,
          });

          alert("Vehicle added successfully.");
        }

        this.modalInstance?.hide();

        this.resetForm();

        this.editingId = null;

        await this.getProducts();
      } catch (error) {
        alert(
          "❌ Failed to save vehicle:\n" +
            (error.response?.data?.detail || error.message),
        );
      }
    },

    async deleteProduct(id) {
      if (!confirm("Are you sure you want to delete this vehicle?")) {
        return;
      }

      try {
        await axios.delete(`${API_BASE_URL}/products/${id}`, {
          withCredentials: true,
        });

        alert("Vehicle deleted successfully.");

        await this.getProducts();
      } catch (error) {
        alert(
          "❌ Failed to delete vehicle:\n" +
            (error.response?.data?.detail || error.message),
        );
      }
    },
  },

  mounted() {
    this.getProducts();

    document
      .getElementById("productModal")
      ?.addEventListener("hidden.bs.modal", () => {
        document
          .querySelectorAll(".modal-backdrop")
          .forEach((el) => el.remove());
      });
  },
};
</script>

<style scoped src="../styles/pages/ProductsPage.css"></style>

<!-- 1145 lines -->
