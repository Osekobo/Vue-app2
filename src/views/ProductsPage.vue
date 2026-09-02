<template>
  <div>
    <!-- Sidebar toggle button -->
    <button class="sidebar-toggle" id="sidebarToggle" @click="sidebarOpen = true">
      <i class="fas fa-bars"></i>
    </button>

    <!-- Overlay (closes sidebar when clicked) -->
    <div class="overlay" :class="{ show: sidebarOpen }" @click="sidebarOpen = false"></div>

    <!-- Sidebar -->
    <nav class="sidebar" :class="{ show: sidebarOpen }">
      <div class="sidebar-header">
        <h4>OBerlo</h4>
        <p>Inventory Management System</p>
      </div>
      <ul style="list-style: none; padding-left: 0">
        <li class="nav-item">
          <router-link class="nav-link" to="/">
            <i class="fas fa-home"></i> Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/dashboard">
            <i class="fas fa-chart-line"></i> Dashboard
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link active" to="/products">
            <i class="fas fa-car"></i> Inventory
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/purchases">
            <i class="fas fa-truck"></i> Purchase Orders
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/sales">
            <i class="fas fa-dollar-sign"></i> Vehicle Sales
          </router-link>
        </li>
        <li class="nav-item logout-btn">
          <a class="nav-link" href="#" @click.prevent="handleLogout">
            <i class="fas fa-sign-out-alt"></i> Logout
          </a>
        </li>
      </ul>
    </nav>

    <!-- MAIN CONTENT -->
    <main>
      <div class="container mt-4">
        <!-- Page Header -->
        <div class="page-header d-flex justify-content-between align-items-center flex-wrap">
          <div>
            <h1><i class="fas fa-car me-2"></i>Vehicle Inventory</h1>
            <p>Complete management for your car yard – all fields included</p>
          </div>
          <button type="button" class="btn-add mt-2 mt-md-0" @click="openAddModal">
            <i class="fas fa-plus me-2"></i>Add New Vehicle
          </button>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-warning" style="width: 3rem; height: 3rem"></div>
          <p class="text-muted mt-3">Loading inventory...</p>
        </div>

        <div v-else>
          <!-- Stats -->
          <div class="row g-4 mb-4">
            <div class="col-md-3 col-6">
              <div class="stat-card">
                <i class="fas fa-car"></i>
                <h3>{{ products.length }}</h3>
                <p>Total Vehicles</p>
              </div>
            </div>
            <div class="col-md-3 col-6">
              <div class="stat-card">
                <i class="fas fa-dollar-sign"></i>
                <h3>KSh {{ totalValue }}</h3>
                <p>Total Inventory Value</p>
              </div>
            </div>
            <div class="col-md-3 col-6">
              <div class="stat-card">
                <i class="fas fa-tags"></i>
                <h3>{{ products.filter(p => p.badge).length }}</h3>
                <p>With Badges</p>
              </div>
            </div>
            <div class="col-md-3 col-6">
              <div class="stat-card">
                <i class="fas fa-image"></i>
                <h3>{{ products.filter(p => p.image).length }}</h3>
                <p>With Images</p>
              </div>
            </div>
          </div>

          <!-- Table -->
          <div class="table-responsive">
            <table class="table product-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Vehicle Name</th>
                  <th>Model</th>
                  <th>Year</th>
                  <th>Condition</th>
                  <th>Fuel</th>
                  <th>Buying</th>
                  <th>Selling</th>
                  <th>Badge</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="prod in products" :key="prod.id">
                  <td>{{ prod.id }}</td>
                  <td>
                    <img
                      v-if="prod.image"
                      :src="prod.image"
                      alt="Vehicle"
                      class="product-img"
                    />
                    <span v-else class="text-muted">—</span>
                  </td>
                  <td><strong>{{ prod.name }}</strong></td>
                  <td>{{ prod.model || '—' }}</td>
                  <td>{{ prod.year }}</td>
                  <td>{{ prod.condition }}</td>
                  <td>{{ prod.fuel }}</td>
                  <td>KSh {{ formatNumber(prod.buying_price) }}</td>
                  <td>KSh {{ formatNumber(prod.selling_price) }}</td>
                  <td>
                    <span
                      v-if="prod.badge"
                      class="badge-custom"
                      :style="badgeStyle(prod.badge)"
                    >
                      {{ prod.badge }}
                    </span>
                    <span v-else class="text-muted">—</span>
                  </td>
                  <td>{{ prod.category || '—' }}</td>
                  <td>
                    <div class="actions">
                      <button class="btn-icon edit" @click="openEditModal(prod.id)" title="Edit">
                        <i class="fas fa-pencil-alt"></i>
                      </button>
                      <button class="btn-icon delete" @click="deleteProduct(prod.id)" title="Delete">
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="products.length === 0">
                  <td colspan="12" class="text-center text-muted py-4">
                    No vehicles found. Click "Add New Vehicle" to get started.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ===== ADD / EDIT VEHICLE MODAL ===== -->
      <div class="modal fade" id="productModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="modalTitle">
                <i class="fas fa-plus-circle me-2"></i>Add New Vehicle
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <form id="productForm" @submit.prevent="saveProduct">
                <!-- === BASIC INFO === -->
                <div class="form-section-title">
                  <i class="fas fa-info-circle me-2"></i>Basic Information
                </div>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">Vehicle Name <span class="text-danger">*</span></label>
                    <input
                      type="text"
                      ref="prodName"
                      class="form-control form-control-custom"
                      placeholder="e.g. Lamborghini Aventador"
                      required
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Model <span class="text-danger">*</span></label>
                    <input
                      type="text"
                      ref="prodModel"
                      class="form-control form-control-custom"
                      placeholder="e.g. Aventador SVJ"
                      required
                    />
                  </div>
                </div>
                <div class="row g-3 mt-1">
                  <div class="col-md-4">
                    <label class="form-label">Year <span class="text-danger">*</span></label>
                    <input
                      type="number"
                      ref="prodYear"
                      class="form-control form-control-custom"
                      placeholder="e.g. 2025"
                      required
                    />
                  </div>
                  <div class="col-md-4">
                    <label class="form-label">Condition <span class="text-danger">*</span></label>
                    <select ref="prodCondition" class="form-select form-select-custom" required>
                      <option value="">Select</option>
                      <option>New</option>
                      <option>Used</option>
                      <option>Refurbished</option>
                      <option>Pre-owned</option>
                    </select>
                  </div>
                  <div class="col-md-4">
                    <label class="form-label">Fuel Type <span class="text-danger">*</span></label>
                    <select ref="prodFuel" class="form-select form-select-custom" required>
                      <option value="">Select</option>
                      <option>Petrol</option>
                      <option>Diesel</option>
                      <option>Electric</option>
                      <option>Hybrid</option>
                      <option>Plug-in Hybrid</option>
                    </select>
                  </div>
                </div>

                <!-- === PRICES === -->
                <div class="form-section-title mt-4">
                  <i class="fas fa-dollar-sign me-2"></i>Pricing
                </div>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">Buying Price (KSh) <span class="text-danger">*</span></label>
                    <input
                      type="number"
                      ref="prodBuying"
                      class="form-control form-control-custom"
                      placeholder="e.g. 25000000"
                      required
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Selling Price (KSh) <span class="text-danger">*</span></label>
                    <input
                      type="number"
                      ref="prodSelling"
                      class="form-control form-control-custom"
                      placeholder="e.g. 35000000"
                      required
                    />
                  </div>
                </div>

                <!-- === BADGE & CATEGORY === -->
                <div class="form-section-title mt-4">
                  <i class="fas fa-tags me-2"></i>Classification
                </div>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">Badge (Tag)</label>
                    <select ref="prodBadge" class="form-select form-select-custom">
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
                  <div class="col-md-6">
                    <label class="form-label">Category</label>
                    <select ref="prodCategory" class="form-select form-select-custom">
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

                <!-- === IMAGES === -->
                <div class="form-section-title mt-4">
                  <i class="fas fa-image me-2"></i>Images
                </div>
                <div class="row g-3">
                  <div class="col-12">
                    <label class="form-label">Upload Images (select multiple)</label>
                    <input
                      type="file"
                      ref="prodImageFile"
                      class="form-control form-control-custom"
                      accept="image/*"
                      multiple
                      @change="handleImageFiles"
                    />
                    <small class="text-muted" style="color: rgba(255,255,255,0.5) !important;">
                      Select one or more images. The first will be used as main thumbnail, the second as hero image.
                    </small>
                  </div>
                  <!-- Preview container -->
                  <div class="col-12" id="imagePreviewContainer">
                    <div class="row g-2" id="imagePreviewRow"></div>
                  </div>
                  <!-- Hidden fallback inputs -->
                  <div style="display: none;">
                    <input type="text" ref="prodImage" class="form-control form-control-custom" />
                    <input type="text" ref="prodHero" class="form-control form-control-custom" />
                  </div>
                </div>

                <!-- === SPECIFICATIONS === -->
                <div class="form-section-title mt-4">
                  <i class="fas fa-cogs me-2"></i>Specifications
                </div>
                <div class="row g-3">
                  <div class="col-md-3">
                    <label class="form-label">Engine</label>
                    <input
                      type="text"
                      ref="prodEngine"
                      class="form-control form-control-custom"
                      placeholder="e.g. V12"
                    />
                  </div>
                  <div class="col-md-3">
                    <label class="form-label">Horsepower</label>
                    <input
                      type="text"
                      ref="prodHp"
                      class="form-control form-control-custom"
                      placeholder="e.g. 759 hp"
                    />
                  </div>
                  <div class="col-md-3">
                    <label class="form-label">Top Speed</label>
                    <input
                      type="text"
                      ref="prodTopSpeed"
                      class="form-control form-control-custom"
                      placeholder="e.g. 220 mph"
                    />
                  </div>
                  <div class="col-md-3">
                    <label class="form-label">0-60 mph</label>
                    <input
                      type="text"
                      ref="prodZeroSixty"
                      class="form-control form-control-custom"
                      placeholder="e.g. 2.8s"
                    />
                  </div>
                </div>
                <div class="row g-3 mt-1">
                  <div class="col-md-6">
                    <label class="form-label">Transmission</label>
                    <input
                      type="text"
                      ref="prodTrans"
                      class="form-control form-control-custom"
                      placeholder="e.g. 7-Speed"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Drivetrain</label>
                    <input
                      type="text"
                      ref="prodDrivetrain"
                      class="form-control form-control-custom"
                      placeholder="e.g. AWD"
                    />
                  </div>
                </div>

                <!-- === DESCRIPTION & FEATURES === -->
                <div class="form-section-title mt-4">
                  <i class="fas fa-file-alt me-2"></i>Description & Features
                </div>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">Subtitle (short spec)</label>
                    <input
                      type="text"
                      ref="prodSubtitle"
                      class="form-control form-control-custom"
                      placeholder="e.g. V12 · 759 hp"
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Features (comma separated)</label>
                    <input
                      type="text"
                      ref="prodFeatures"
                      class="form-control form-control-custom"
                      placeholder="e.g. Full Service History, 12-Month Warranty"
                    />
                  </div>
                </div>
                <div class="mt-3">
                  <label class="form-label">Description</label>
                  <textarea
                    ref="prodDescription"
                    class="form-control form-control-custom"
                    rows="4"
                    placeholder="Write a detailed description of the vehicle..."
                  ></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn-modal-cancel" data-bs-dismiss="modal">
                Cancel
              </button>
              <button type="button" class="btn-modal-submit" id="saveProductBtn" @click="saveProduct">
                <i class="fas fa-save me-2"></i><span id="saveBtnText">Add Vehicle</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/utils/config';
import { Modal } from 'bootstrap';

export default {
  name: 'ProductsPage',
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
        total += this.products[i].selling_price || 0;
      }
      return total.toLocaleString();
    },
  },
  methods: {
    formatNumber(num) {
      return num ? Number(num).toLocaleString() : '0';
    },
    badgeStyle(badge) {
      const colors = {
        Featured: 'background:#ffc107;color:#000;',
        New: 'background:#28a745;color:#fff;',
        Hybrid: 'background:#17a2b8;color:#fff;',
        Luxury: 'background:#6c757d;color:#fff;',
        Electric: 'background:#007bff;color:#fff;',
        Hypercar: 'background:#dc3545;color:#fff;',
        Muscle: 'background:#fd7e14;color:#fff;',
        Performance: 'background:#6f42c1;color:#fff;',
        Supercar: 'background:#e83e8c;color:#fff;',
      };
      return colors[badge] || 'background:#6c757d;color:#fff;';
    },
    async getProducts() {
      try {
        const response = await axios.get(`${API_BASE_URL}/products`, {
          withCredentials: true,
        });
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
        if (error.response?.status === 401) {
          this.$router.push('/login');
        }
      } finally {
        this.loading = false;
      }
    },
    async handleLogout() {
      try {
        await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
      } catch (error) {
        console.error('Logout error:', error);
      }
      this.$router.push('/login');
    },

    // ── Open Add Modal ──
    openAddModal() {
      this.editingId = null;
      document.getElementById('modalTitle').innerHTML =
        '<i class="fas fa-plus-circle me-2"></i>Add New Vehicle';
      document.getElementById('saveBtnText').innerText = 'Add Vehicle';
      this.resetForm();
      this.modalInstance = new Modal(document.getElementById('productModal'));
      this.modalInstance.show();
    },

    // ── Open Edit Modal ──
    openEditModal(id) {
      const product = this.products.find((p) => p.id === id);
      if (!product) return;

      this.editingId = id;
      document.getElementById('modalTitle').innerHTML =
        '<i class="fas fa-edit me-2"></i>Edit Vehicle';
      document.getElementById('saveBtnText').innerText = 'Update Vehicle';

      // Populate all fields using refs
      this.$refs.prodName.value = product.name || '';
      this.$refs.prodModel.value = product.model || '';
      this.$refs.prodYear.value = product.year || '';
      this.$refs.prodCondition.value = product.condition || '';
      this.$refs.prodFuel.value = product.fuel || '';
      this.$refs.prodBuying.value = product.buying_price || '';
      this.$refs.prodSelling.value = product.selling_price || '';
      this.$refs.prodBadge.value = product.badge || '';
      this.$refs.prodCategory.value = product.category || '';
      this.$refs.prodImage.value = product.image || '';
      this.$refs.prodHero.value = product.hero_image || '';
      this.showExistingImagePreview(product.image, product.hero_image);

      this.$refs.prodEngine.value = product.engine || '';
      this.$refs.prodHp.value = product.horsepower || '';
      this.$refs.prodTopSpeed.value = product.top_speed || '';
      this.$refs.prodZeroSixty.value = product.zero_to_sixty || '';
      this.$refs.prodTrans.value = product.transmission || '';
      this.$refs.prodDrivetrain.value = product.drivetrain || '';
      this.$refs.prodSubtitle.value = product.subtitle || '';
      this.$refs.prodDescription.value = product.description || '';
      this.$refs.prodFeatures.value = product.features ? product.features.join(', ') : '';

      this.modalInstance = new Modal(document.getElementById('productModal'));
      this.modalInstance.show();
    },

    // ── Show existing images in preview ──
    showExistingImagePreview(imageUrl, heroUrl) {
      const previewRow = document.getElementById('imagePreviewRow');
      previewRow.innerHTML = '';
      if (imageUrl) {
        this.addPreview(imageUrl, 'Main');
      }
      if (heroUrl) {
        this.addPreview(heroUrl, 'Hero');
      }
    },

    // ── Helper to add a preview image ──
    addPreview(src, label) {
      const previewRow = document.getElementById('imagePreviewRow');
      const col = document.createElement('div');
      col.className = 'col-4 col-md-2';
      col.innerHTML = `
        <div class="position-relative">
          <img src="${src}" class="img-fluid rounded" style="height:80px;object-fit:cover;width:100%;" />
          <span class="badge bg-warning text-dark position-absolute top-0 end-0 m-1" style="font-size:10px;">
            ${label}
          </span>
        </div>
      `;
      previewRow.appendChild(col);
    },

    // ── Handle file selection ──
    handleImageFiles(event) {
      const files = event.target.files;
      const previewRow = document.getElementById('imagePreviewRow');
      previewRow.innerHTML = '';
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
          const label = index === 0 ? 'Main' : 'Hero';
          this.addPreview(dataUrl, label);
        };
        reader.readAsDataURL(file);
      });
    },

    // ── Reset Form ──
    resetForm() {
      const refs = this.$refs;
      refs.prodName.value = '';
      refs.prodModel.value = '';
      refs.prodYear.value = '';
      refs.prodCondition.value = '';
      refs.prodFuel.value = '';
      refs.prodBuying.value = '';
      refs.prodSelling.value = '';
      refs.prodBadge.value = '';
      refs.prodCategory.value = '';
      refs.prodImage.value = '';
      refs.prodHero.value = '';
      refs.prodEngine.value = '';
      refs.prodHp.value = '';
      refs.prodTopSpeed.value = '';
      refs.prodZeroSixty.value = '';
      refs.prodTrans.value = '';
      refs.prodDrivetrain.value = '';
      refs.prodSubtitle.value = '';
      refs.prodDescription.value = '';
      refs.prodFeatures.value = '';
      refs.prodImageFile.value = '';
      document.getElementById('imagePreviewRow').innerHTML = '';
    },

    // ── Save Vehicle ──
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
          ? this.$refs.prodFeatures.value.split(',').map((s) => s.trim()).filter(Boolean)
          : null,
      };

      // Validation
      if (
        !data.name ||
        !data.model ||
        !data.year ||
        !data.condition ||
        !data.fuel ||
        !data.buying_price ||
        !data.selling_price
      ) {
        alert('Please fill in all required fields (*)');
        return;
      }

      try {
        if (this.editingId) {
          await axios.put(`${API_BASE_URL}/products/${this.editingId}`, data, {
            withCredentials: true,
          });
          alert('✅ Vehicle updated successfully!');
        } else {
          await axios.post(`${API_BASE_URL}/products`, data, {
            withCredentials: true,
          });
          alert('✅ Vehicle added successfully!');
        }

        this.modalInstance?.hide();
        this.resetForm();
        this.editingId = null;
        await this.getProducts();
      } catch (error) {
        alert(
          '❌ Failed to save vehicle:\n' +
            (error.response?.data?.detail || error.message)
        );
      }
    },

    // ── Delete Vehicle ──
    async deleteProduct(id) {
      if (!confirm('Are you sure you want to delete this vehicle?')) return;
      try {
        await axios.delete(`${API_BASE_URL}/products/${id}`, {
          withCredentials: true,
        });
        alert('✅ Vehicle deleted successfully!');
        await this.getProducts();
      } catch (error) {
        alert(
          '❌ Failed to delete vehicle:\n' +
            (error.response?.data?.detail || error.message)
        );
      }
    },
  },
  mounted() {
    this.getProducts();

    // Clean up modal backdrop when hidden
    document.getElementById('productModal')?.addEventListener('hidden.bs.modal', () => {
      document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
    });
  },
};
</script>

<style scoped>
/* ── Global & shared styles (scoped) ── */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
main {
  padding-top: 80px;
}

/* ── Top Navbar ── */
/* (Not needed here since navbar is in App.vue) */

/* ── Sidebar ── */
.sidebar {
  position: fixed;
  left: -280px;
  top: 0;
  bottom: 0;
  width: 280px;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
  transition: 0.3s ease-in-out;
  z-index: 1001;
  padding-top: 80px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}
.sidebar.show {
  left: 0;
}
.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 20px;
}
.sidebar-header h4 {
  color: #ffc107;
  margin: 0;
}
.sidebar-header p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  margin: 5px 0 0;
}
.sidebar .nav-item {
  margin: 5px 0;
}
.sidebar .nav-link {
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 12px 20px;
  transition: all 0.3s;
  font-weight: 500;
  border-radius: 8px;
  margin: 0 10px;
}
.sidebar .nav-link i {
  width: 25px;
  margin-right: 15px;
  font-size: 18px;
}
.sidebar .nav-link:hover {
  background: #ffc107;
  color: #000;
  transform: translateX(5px);
}
.sidebar .nav-link.active {
  background: #ffc107;
  color: #000;
}
.sidebar .logout-btn {
  margin-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 20px;
}
.sidebar .logout-btn .nav-link {
  color: #ff6b6b;
}
.sidebar .logout-btn .nav-link:hover {
  background: #ff6b6b;
  color: white;
}

.sidebar-toggle {
  position: fixed;
  left: 20px;
  top: 80px;
  z-index: 1002;
  background: #ffc107;
  border: none;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}
.sidebar-toggle:hover {
  background: #ffca2c;
  transform: scale(1.05);
}
.sidebar-toggle i {
  font-size: 20px;
  color: #000;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: none;
}
.overlay.show {
  display: block;
}

@media (max-width: 768px) {
  .sidebar-toggle {
    top: 70px;
    left: 10px;
    width: 40px;
    height: 40px;
  }
}

/* ── Page styles ── */
.page-header h1 {
  color: #1a1a2e;
  font-weight: 800;
}
.page-header p {
  color: #666;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 24px 20px;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}
.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}
.stat-card i {
  font-size: 32px;
  color: #ffc107;
  margin-bottom: 8px;
}
.stat-card h3 {
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
}
.stat-card p {
  color: #888;
  margin: 0;
  font-size: 14px;
}

.btn-add {
  background: #ffc107;
  color: #000;
  border: none;
  padding: 10px 24px;
  border-radius: 40px;
  font-weight: 600;
  transition: all 0.3s;
}
.btn-add:hover {
  background: #ffca2c;
  transform: scale(1.02);
  color: #000;
}

.product-table {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.04);
}
.product-table th {
  background: #f8f9fa;
  color: #1a1a2e;
  font-weight: 600;
  border: none;
  padding: 14px 16px;
  font-size: 13px;
  white-space: nowrap;
}
.product-table td {
  padding: 12px 16px;
  border-color: #f0f0f0;
  vertical-align: middle;
  font-size: 13px;
}
.product-table .product-img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 8px;
}
.product-table .badge-custom {
  font-size: 10px;
  padding: 3px 10px;
  border-radius: 30px;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
}
.product-table .actions {
  display: flex;
  gap: 6px;
}
.product-table .actions .btn-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  font-size: 13px;
  cursor: pointer;
}
.product-table .actions .btn-icon.edit {
  background: #ffc107;
  color: #000;
}
.product-table .actions .btn-icon.edit:hover {
  background: #ffca2c;
  transform: scale(1.05);
}
.product-table .actions .btn-icon.delete {
  background: #dc3545;
  color: #fff;
}
.product-table .actions .btn-icon.delete:hover {
  background: #c82333;
  transform: scale(1.05);
}

/* ── Modal form styles ── */
.modal-content {
  background: #1a1a2e;
  color: white;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.06);
}
.modal-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding: 20px 28px;
}
.modal-header .modal-title {
  font-weight: 700;
  font-size: 20px;
  color: white;
}
.modal-body {
  padding: 24px 28px;
  max-height: 75vh;
  overflow-y: auto;
}
.modal-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding: 16px 28px;
}
.modal {
  z-index: 1105 !important;
}
.modal-backdrop.show {
  z-index: 1100 !important;
  background-color: rgba(0, 0, 0, 0.55) !important;
}
.modal .modal-content {
  background: #1a1a2e !important;
  color: white !important;
}
.modal .modal-body {
  color: white !important;
}
.modal .form-label {
  color: rgba(255, 255, 255, 0.95) !important;
}
.modal .form-control-custom,
.modal .form-select-custom {
  background: rgba(255, 255, 255, 0.08) !important;
  border: 1px solid rgba(255, 255, 255, 0.16) !important;
  color: white !important;
}
.form-label {
  font-weight: 500;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 4px;
  display: block;
}
.form-control-custom,
.form-select-custom {
  background: rgba(255, 255, 255, 0.07) !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  border-radius: 10px;
  padding: 10px 16px;
  color: white !important;
  width: 100%;
  transition: all 0.3s;
  font-size: 14px;
}
.form-control-custom:focus,
.form-select-custom:focus {
  background: rgba(255, 255, 255, 0.12) !important;
  border-color: #ffc107 !important;
  box-shadow: 0 0 0 4px rgba(255, 193, 7, 0.08);
  outline: none;
  color: white !important;
}
.form-control-custom::placeholder {
  color: rgba(255, 255, 255, 0.4) !important;
}
.form-select-custom option {
  background: #1a1a2e;
  color: white;
}
.form-section-title {
  font-size: 15px;
  font-weight: 600;
  color: #ffc107;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 8px;
  margin-bottom: 16px;
  margin-top: 12px;
}
.btn-modal-submit {
  background: #ffc107;
  color: #000;
  border: none;
  padding: 10px 30px;
  border-radius: 40px;
  font-weight: 600;
  transition: all 0.3s;
  font-size: 14px;
}
.btn-modal-submit:hover {
  background: #ffca2c;
  transform: scale(1.02);
  color: #000;
}
.btn-modal-cancel {
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 10px 24px;
  border-radius: 40px;
  font-weight: 500;
  transition: all 0.3s;
}
.btn-modal-cancel:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}
.btn-close {
  filter: invert(1);
  opacity: 0.6;
}
.btn-close:hover {
  opacity: 1;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .product-table th,
  .product-table td {
    font-size: 12px;
    padding: 8px 10px;
  }
  .product-table .product-img {
    width: 35px;
    height: 35px;
  }
  .modal-body {
    padding: 16px;
  }
  .modal-header,
  .modal-footer {
    padding: 16px;
  }
  .form-section-title {
    font-size: 14px;
  }
  #imagePreviewRow .col-4 {
    flex: 0 0 auto;
    width: 33.333%;
  }
}
</style>