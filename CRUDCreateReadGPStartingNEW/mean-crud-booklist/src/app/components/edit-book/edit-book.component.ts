import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CrudService } from "src/app/service/crud.service";
import {  FormBuilder, FormGroup } from "@angular/forms";
import { Book } from "src/app/service/Book";
@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent {

  bookForm: FormGroup;
  BookId: string | undefined;

  constructor(private activatedRoute: ActivatedRoute, private crudService: CrudService, private formBuilder: FormBuilder, private router: Router) {
    {
      // Initialize form with empty values
      this.bookForm = this.formBuilder.group({
        title: [''],
        author: [''],
        description: [''],
        publishedYear: [''],
        publisher: [''],
        isbn: ['']
      });
  }
}
ngOnInit(): void {
  // Get book ID from route params
  this.BookId = this.activatedRoute.snapshot.paramMap.get('id') || '';

  // Fetch book data based on ID
  this.crudService.GetBooks().subscribe((books: Book[]) => {
    const bookToEdit = books.find(book => book._id === this.BookId);
    if (bookToEdit) {
      // Populate form with existing book data
      this.bookForm.patchValue({
        title: bookToEdit.title,
        author: bookToEdit.author,
        description: bookToEdit.description,
        publishedYear: bookToEdit.published_year,
        publisher: bookToEdit.publisher,
        isbn: bookToEdit.isbn
      });
    } else {
      console.error('Book not found!');
    }
  });
}
onSubmit(): void {
  // Update book data
  if (this.bookForm.valid) {
    this.crudService.UpdateBook(this.BookId, this.bookForm.value).subscribe(
      (response) => {
        console.log('Book updated successfully:', response);
        // Navigate back to the book list or to the updated book details page
        this.router.navigate(['/books']);
      },
      (error) => {
        console.error('Error updating book:', error);
      }
    );
  } else {
    console.error('Form is invalid!');
  }
}

}


