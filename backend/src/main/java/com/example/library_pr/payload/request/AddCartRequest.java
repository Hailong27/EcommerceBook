package com.example.library_pr.payload.request;

import javax.validation.constraints.NotBlank;

public class AddCartRequest {
	@NotBlank
	private String id;
	@NotBlank
	private String quantity;
	@NotBlank
	private String name;
	@NotBlank
	private String address;
	@NotBlank
	private String phone;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getQuantity() {
		return quantity;
	}
	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	
}
