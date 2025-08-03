import type { AxiosInstance } from "axios";

export default class DroneService {
  private api : AxiosInstance;

  constructor(api : AxiosInstance) {
    this.api = api;
  }

  async getDrones () {
    const res = await this.api.get('/drones/');
    return res.data;
  }

  async getOnlineDrones () {
    const res = await this.api.get('/drones/online');
    return res.data;
  }

  async getDangerousDrones () {
    const res = await this.api.get('/drones/dangerous');
    return res.data;
  }

  async getStats () {
    // after i add an endpoint for these
  }

  async getFilteredDrones (serial : string) {
    const res = await this.api.get(`/drones/?partial_serial=${serial}`);
    return res.data;
  }

  async getNearbyDrones (long : number, lat : number) {
    const res = await this.api.get(`drones/within-5km/?latitude=${lat}&longitude=${long}`);
    return res.data; 
  }

};