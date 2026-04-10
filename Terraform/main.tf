terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }

  backend "gcs" {
    bucket = "movies-watchlist-tfstate-rishi"
    prefix = "terraform/state"
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

resource "google_artifact_registry_repository" "movies_watchlist_repo_rishi" {
  location      = var.region
  repository_id = "movies-watchlist-repo-rishi"
  format        = "DOCKER"
  description   = "Docker images for movies watchlist app"
}

resource "google_sql_database_instance" "movies_watchlist_instance_rishi" {
  name             = "movies-watchlist-instance-rishi"
  database_version = "POSTGRES_16"
  region           = var.region

  settings {
    tier = "db-f1-micro"

    ip_configuration {
      authorized_networks {
        value = "0.0.0.0/0"
        name  = "all"
      }
    }
  }

  deletion_protection = false
}

resource "google_sql_database" "movies_watchlist_database_rishi" {
  name     = "movies_watchlist_db_rishi"
  instance = google_sql_database_instance.movies_watchlist_instance_rishi.name
}

resource "google_sql_user" "postgres" {
  name     = "postgres"
  instance = google_sql_database_instance.movies_watchlist_instance_rishi.name
  password = var.db_password
}

resource "google_cloud_run_v2_service" "movies_watchlist_service_rishi" {
  name     = "movies-watchlist-api-rishi"
  location = var.region

  template {
    containers {
      image = "${var.region}-docker.pkg.dev/${var.project_id}/movies-watchlist-repo-rishi/movie-watchlist-backend:latest"

      env {
        name  = "DB_HOST"
        value = google_sql_database_instance.movies_watchlist_instance_rishi.public_ip_address
      }
      env {
        name  = "DB_PORT"
        value = "5432"
      }
      env {
        name  = "DB_NAME"
        value = google_sql_database.movies_watchlist_database_rishi.name
      }
      env {
        name  = "DB_USER"
        value = "postgres"
      }
      env {
        name  = "DB_PASS"
        value = var.db_password
      }
      env {
        name  = "DB_DIALECT"
        value = "postgres"
      }
      env {
        name  = "JWT_SECRET"
        value = var.jwt_secret
      }
      env {
        name  = "NODE_ENV"
        value = "production"
      }
    }
  }

  depends_on = [google_artifact_registry_repository.movies_watchlist_repo_rishi]
}

resource "google_cloud_run_v2_service_iam_member" "movies_watchlist_service_rishi_public" {
  name     = google_cloud_run_v2_service.movies_watchlist_service_rishi.name
  location = var.region
  role     = "roles/run.invoker"
  member   = "allUsers"
}
