package br.com.api.person.controller.exceptions;

import java.time.Instant;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StandardError {
    private Instant timestamp;
	private Integer status;
	private String error;
	private String message;
	private String path;
	
	public StandardError() {
	}
}
