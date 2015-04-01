package br.unicesumar.datapage;

import static br.unicesumar.util.nvl.NvlUtil.nvlToOne;
import static br.unicesumar.util.nvl.NvlUtil.nvlToEmpty;
import static org.springframework.data.domain.Sort.Direction.ASC;
import static org.springframework.data.domain.Sort.Direction.DESC;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

public class DataPage<T> implements Serializable {

	private static final long serialVersionUID = 1L;

	public static final int MAX_ROWS = 7;
	public static final int MAX_PAGES_TO_SHOW = 5;

	private final List<T> list;
	private final int pageNumber;
	private final int pageCount;
	private int[] pagesAround;

	public static PageRequest pageRequestForAsc(Integer pagina, String property) {
		return pageRequestFor(pagina, new Sort(new Sort.Order(ASC, nvlToEmpty(property))));
	}
	
	public static PageRequest pageRequestForDesc(Integer pagina, String property) {
		return pageRequestFor(pagina, new Sort(new Sort.Order(DESC, nvlToEmpty(property))));
	}

	public static PageRequest pageRequestFor(Integer pagina, Sort sort) {
		return new PageRequest(nvlToOne(pagina)-1, MAX_ROWS, sort);
	}

	public DataPage(Page<T> page) {
		this.list = page.getContent();
		this.pageNumber = page.getNumber()+1;
		this.pageCount = page.getTotalPages();
		this.pagesAround = generatePagesAround();
	}

	private int[] generatePagesAround() {
		int initialDistance = MAX_PAGES_TO_SHOW / 2;		

//		int pages = MAX_PAGES_TO_SHOW-1;
		int right = pageNumber + initialDistance;
		int left = pageNumber - initialDistance;
		while (right > pageCount) {
			right--;			
			left = left - 1 >=1 ? left-1:left;
		}
		while (left < 1) {
			left++;
			right = right + 1 <= pageCount ? right+1 : right;
		}
		int total = right-left+1;
		int[] toReturn = new int[total];
		for (int i = 0; i < total; i++) {
			toReturn[i] = left+i;
		}				

	/*	int toStart = pageNumber - 1;
		toStart = toStart > initialDistance && pageCount > MAX_PAGES_TO_SHOW ? -initialDistance : -toStart;
		
		int toEnd = pageCount - pageNumber;
		toEnd = toEnd > initialDistance && pageNumber+toEnd > MAX_PAGES_TO_SHOW ? initialDistance : toEnd;
		
				
		if (toEnd < initialDistance && pageCount > MAX_PAGES_TO_SHOW)
			toStart -= initialDistance - toEnd;
		
		int pagesToShow = toEnd - toStart + 1;
		pagesToShow = pageCount >= MAX_PAGES_TO_SHOW ? MAX_PAGES_TO_SHOW : pagesToShow;
		
		int[] toReturn = new int[pagesToShow];
		
		int position = 0;
		for (int i = toStart; i <= toEnd; i++) {
			toReturn[position++] = pageNumber + i; 
		} */

		return toReturn;
	}

	public List<T> getList() {
		return list;
	}

	public int getPageNumber() {
		return pageNumber;
	}

	public int getPageCount() {
		return pageCount;
	}
	
	public int[] getPagesAround() {
		return pagesAround;
	}
}
